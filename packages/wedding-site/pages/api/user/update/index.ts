import conn from "@/pg/client";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    console.log(`LASDFASDF`)
    if (req.method !== 'POST') {
        return res.status(400).send('Unsupported HTTP method supplied to route')
    }

    const {
      /**
       * @see https://auth0.com/docs/secure/tokens/access-tokens
       */
      accessToken,
      user,
    } = await getSession(req, res) as Session;

    if (!accessToken) {
      return res.status(403).send('Forbidden')
    }

    if (!user) {
      return res.status(500).send('Internal server error - User not found')
    }
    
    try {
      if (conn) {
        const {
            email,
            isGoing,
            firstName,
            lastName,
            horsDoeuvresSelection,
            entreeSelection
        } = req.body
        let query = `UPDATE users SET is_going = $1, first_name = $2, last_name = $3, hors_doeuvres_selection = $4, entree_selection = $5 WHERE email = $6`
        await conn.query(query, [isGoing, firstName, lastName, horsDoeuvresSelection, entreeSelection, email])
        query = `SELECT * FROM users WHERE email = $1`
        const queryRes = await conn.query(query, [email])
        return res.status(200).json({ message: "OK", rowsAffected: queryRes.rowCount, data: queryRes.rows[0] })
      }
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e}`)
    }
}