import * as React from 'react';
import { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { store } from '../store/store'
import NavBar from '../components/NavBar'
import ReduxFirebaseProvider from '../components/ReduxFirebaseProvider'

interface Props { }

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: 'Inter', sans-serif;               
    -webkit-tap-highlight-color: transparent;
  }

  *::selection {
    background-color: #5fa765;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

function _app({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <ReduxFirebaseProvider>
            <NavBar />
            <Component {...pageProps} />
          </ReduxFirebaseProvider>
        </Provider>
      </Container>
    </>
  )
}

export default _app;