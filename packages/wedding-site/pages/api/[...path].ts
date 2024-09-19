import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { Stream } from 'stream'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.API_URL

const proxy = httpProxy.createProxyServer()

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
	api: {
		bodyParser: false,
	},
}

function parseJwt (token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

// See https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens
export default (req: NextApiRequest, res: NextApiResponse) => {
	// Return a Promise to let Next.js know when we're done
	// processing the request:
	return new Promise((resolve, reject) => {
		// In case the current API request is for logging in,
		// we'll need to intercept the API response.
		// More on that in a bit.
		const pathname = url.parse(req.url || ``).pathname
		const isLoginOrSignup = pathname === '/api/login' || pathname == '/api/signup'

		// Get the `auth-token` cookie:
		const cookies = new Cookies(req, res)
		const authToken = cookies.get('auth-token')
        const refreshToken = cookies.get('refresh-token')

		req.url = req.url.replace(/^\/api/, '')

		// Don't forward cookies to the API:
		req.headers.cookie = ''

		// Set auth-token header from cookie:
		if (authToken) {
			req.headers['auth-token'] = authToken
            req.headers['refresh-token'] = refreshToken
		}

		// In case the request is for login, we need to
		// intercept the API's response. It contains the
		// auth token that we want to strip out and set
		// as an HTTP-only cookie.
		if (isLoginOrSignup) {
			proxy.once('proxyRes', interceptAuthResponse)
		}

		// Don't forget to handle errors:
		proxy.once('error', reject)

		// Forward the request to the API
		proxy.web(req, res, {
			target: API_URL,

			// Don't autoRewrite because we manually rewrite
			// the URL in the route handler.
			autoRewrite: false,

			// In case we're dealing with a login request,
			// we need to tell http-proxy that we'll handle
			// the client-response ourselves (since we don't
			// want to pass along the auth token).
			selfHandleResponse: isLoginOrSignup,
		})

		function interceptAuthResponse(proxyRes: Stream, req: NextApiRequest, res: NextApiResponse) {
			// Read the API's response body from
			// the stream:
			let apiResponseBody = ''
			proxyRes.on('data', (chunk) => {
				apiResponseBody += chunk
			})

			// Once we've read the entire API
			// response body, we're ready to
			// handle it:
			proxyRes.on('end', () => {
				try {
					// Extract the authToken from API's response:
					const { data } = JSON.parse(apiResponseBody)

					// Set the authToken as an HTTP-only cookie.
					// We'll also set the SameSite attribute to
					// 'lax' for some additional CSRF protection.
					const cookies = new Cookies(req, res)
					cookies.set('auth-token', data.token, {
						httpOnly: true,
						sameSite: 'lax',
					})
                    cookies.set('refresh-token', data.refresh_token, {
						httpOnly: true,
						sameSite: 'lax',
					})

					const parsedToken = parseJwt(data.token)
					cookies.set('user-session', JSON.stringify(parsedToken), {
						// expires: new Date(parsedToken.exp * 1000),
						sameSite: 'lax',
					})

					// Our response to the client won't contain
					// the actual authToken. This way the auth token
					// never gets exposed to the client.
					res.status(200).json({ loggedIn: true })
					resolve(null)
				} catch (err) {
					reject(err)
				}
			})
		}
	})
}
