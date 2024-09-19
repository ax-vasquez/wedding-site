import { useCookies } from "react-cookie"

export const useUser = () => {
    const [cookies] = useCookies(['user-session'])

    let user = null
    const str = cookies['user-session']
    if (str) {
        user = str
    }

    return user
}
