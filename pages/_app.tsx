import React from 'react'
import { AppProps } from 'next/app'
import { wrapper } from '../redux';


interface Props {

}

function _app({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(_app);