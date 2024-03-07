import express from 'express'
import cors from 'cors'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser'

const app = express()

const auth = basicAuth({
    authorizeAsync: true,
    authorizer: (user, password, authorize) => {
        console.log(`AUTH TEST: ${user}:${password}`)
        return authorize(null, password === 'poopy_password')
    }
})

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(cookieParser('crappy_signing_secret_delete_me'))

app.get('/login', auth, (req, res) => {
    const options = {
        httpOnly: true,
        signed: true
    }

    if (!req.headers.authorization) {
        return res.send(400)
    }

    const parts = req.headers.authorization.split(':')

    const email = parts[0]

    res.cookie('email', email, options).send({ screen: email })
})

app.get('/read-cookie', (req, res) => {
    console.log(`getting cookie`)
    if (req.signedCookies.email === 'a@b.com') {
        console.log(`FOUND!`)
        res.send({ screen: "a@b.com" })
    } else {
        res.send({ screen: 'auth' })
    }
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
