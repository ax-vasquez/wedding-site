import '@/styles/main.scss'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../redux/store'
import { UserProvider } from '@auth0/nextjs-auth0/client'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  )
}