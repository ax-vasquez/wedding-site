import { UserClaims } from "@/components/modal/AuthModal"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export const useUser = () => {
    const [user, setUser] = useState(null as UserClaims)
    const [cookies] = useCookies(['user-session'])

    useEffect(() => {
        const str = cookies['user-session']
        if (str) {
            setUser(str)
        } else {
            setUser(null)
        }
    }, [cookies])

    return user
}
