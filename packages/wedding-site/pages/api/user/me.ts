import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {
      user
    } = await getSession(req, res) as Session;

    if (!user) {
      return 
    }
    
    res.status(200).json({ ...user });
  }
