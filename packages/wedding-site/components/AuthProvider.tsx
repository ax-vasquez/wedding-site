import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext({ token: '', setToken: (s: string) => {} })

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // TODO: get this token from cookies
    const [token, setToken_] = useState('');

    const setToken = (newToken: string) => {
      setToken_(newToken);
    }

    const contextValue = useMemo(
        () => ({
          token,
          setToken,
        }),
        [token]
    )

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token
          axios.defaults.headers.common["X-CSRF-Token"] = "some_token"
          // TODO: Replace this with secure cookie storage; this approach is not safe (the token can be read from the storage and used for CSRF attacks)
          // localStorage.setItem('token',token);
        } else {
          delete axios.defaults.headers.common["Authorization"]
          delete axios.defaults.headers.common["X-CSRF-Token"]
          // TODO: Related to todo above
          // localStorage.removeItem('token')
        }
    }, [token])

    return (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;
