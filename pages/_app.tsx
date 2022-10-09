import * as React from 'react';
import { AppProps } from 'next/app'
import { wrapper } from '../redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'boxicons/css/boxicons.min.css';
import 'jquery/dist/jquery.min.js';
import SSRProvider from 'react-bootstrap/SSRProvider'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';
import { store } from '../store/store'
interface Props {

}

function _app({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </Provider>
    </SessionProvider>
  )
}

export default _app;