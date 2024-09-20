import '@/styles/main.scss'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../redux/store'
import { CookiesProvider } from 'react-cookie';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  )
}