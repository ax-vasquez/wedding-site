import conn from "@/pg/client";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
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
        const query = `SELECT * FROM users WHERE email = $1`
        const queryRes = await conn.query(query, [user.email])
        return res.status(200).json(queryRes.rows[0])
      }
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`)
    }
}
