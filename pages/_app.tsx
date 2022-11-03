import * as React from 'react'
import { useState } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import Router from 'next/router'

import { store } from '../store/store'
import NavBar from '../components/NavBar'
import ReduxFirebaseProvider from '../components/ReduxFirebaseProvider'
import Loading from '../components/Loading'

interface Props { }

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* color-scheme: dark; */
  }

  body {
    min-height: 100vh;
    font-family: 'Inter', sans-serif;    
    -webkit-tap-highlight-color: transparent;
  }

  *::selection {
    background-color: #ffb274;
  }

  /* ::-webkit-scrollbar {
    width: .3em;
  }

  ::-webkit-scrollbar-track {
  background-color: #9e0e0e;
  }

  ::-webkit-scrollbar-thumb {
  background-color: #ffb274;
  border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb:hover {
  background-color: #ce915e;
  }

  ::-webkit-scrollbar-thumb:active {
  background-color: #9b6d47;
  } */

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }
`

const Container = styled.div`
  min-height: 101vh;
  max-width: 1440px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`

function _app({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(false)
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false)
  })

  return (
    <>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <ReduxFirebaseProvider>
            <NavBar />
            {!loading ? <Component {...pageProps} /> : <Loading />}
          </ReduxFirebaseProvider>
        </Provider>
      </Container>
    </>
  )
}

export default _app;