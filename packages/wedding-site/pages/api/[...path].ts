import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { Stream } from 'stream'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponseV1 } from '@/types'

export const API_URL = process.env.API_URL

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

		// @ts-ignore
		req.url = req.url.replace(/^\/api/, '')

		// Don't forward cookies to the API:
		req.headers.cookie = ''

		// Set auth-token header from cookie:
		if (authToken && refreshToken) {
			req.headers['auth-token'] = authToken
            req.headers['refresh-token'] = refreshToken
		}

		// In case the request is for login, we need to
		// intercept the API's response. It contains the
		// auth token that we want to strip out and set
		// as an HTTP-only cookie.
		if (isLoginOrSignup) {
			// @ts-ignore
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

			// Prevent 405 errors in deployment
			xfwd: true
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
					const response: ApiResponseV1 = JSON.parse(apiResponseBody)

					switch (response.status) {
						case 201:
						case 202: {
							const token = response.data.token
							const refreshToken = response.data.refresh_token
							if (token && refreshToken) {

								const cookies = new Cookies(req, res)
								cookies.set('auth-token', token, {
									httpOnly: true,
									maxAge: 2 * 60 * 60 * 1000,
									path: "/",
									sameSite: 'lax',
								})
								cookies.set('refresh-token', refreshToken, {
									httpOnly: true,
									maxAge: 2 * 60 * 60 * 1000,
									path: "/",
									sameSite: 'lax',
								})

								const parsedToken = parseJwt(token)
								cookies.set('user-session', JSON.stringify(parsedToken), {
									httpOnly: false,
									maxAge: 2 * 60 * 60 * 1000,
									path: "/",
									sameSite: 'lax',
								})

								// Don't pass token to client
								res.status(response.status).json({ message: "success!" })
								resolve(null)
							}
							break;
						}
						case 401:
						case 404:
						case 500: {
							res.status(response.status).json({ message: response.message })
							resolve(null)
						}
						default: {
							break;
						}
					}
				} catch (err) {
					reject(err)
				}
			})
		}
	})
}
