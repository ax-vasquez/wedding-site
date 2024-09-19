import '@/styles/main.scss'
import '@/styles/globals.css'
import axios from 'axios';
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../redux/store'
import { CookiesProvider } from 'react-cookie';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  // axios.defaults.headers.common["Content-Type"] = "application/json"
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  )
}