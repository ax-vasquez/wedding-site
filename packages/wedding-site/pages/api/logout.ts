import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
 
type ResponseData = {
    message: string
}
 
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const cookies = new Cookies(req, res)
    cookies.set('auth-token', null)
    cookies.set('refresh-token', null)
    cookies.set('user-session', null)
    res.status(202).json({ message: 'Logged out.' })
}