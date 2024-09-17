import { useAuth } from "@/components/AuthProvider"

// Obtain the user if a token exists. Cache respones. If the user has already been fetched from the API, use the cached version
export const useUser = () => {
    const { token } = useAuth()
    if (token.length > 0) {
        // If the user data exists in the cache, return that
        // If the user data does not exist in the cache, fetch it via the API
    }
    return {} as any
}
