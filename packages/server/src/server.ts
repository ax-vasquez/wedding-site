import express from 'express'
import cors from 'cors'
import { ConfigParams, auth, requiresAuth } from 'express-openid-connect'
import 'dotenv/config'

const app = express()
app.use(cors())

const auth0Config: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET,
}

app.use(auth(auth0Config))

app.get('/', (req, res) => {
    console.log(`IS LOGGED IN: `, req.oidc.isAuthenticated())
    res.redirect('http://localhost:3000')
})

app.get('/user', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
