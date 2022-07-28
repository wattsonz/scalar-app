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
interface Props {

}

function _app({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>
  )
}

export default wrapper.withRedux(_app);