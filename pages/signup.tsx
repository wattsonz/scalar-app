import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styled, { keyframes } from 'styled-components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { LogoIcon } from '../assets/logos'
import { validateEmail, validatePassword } from '../utils/formValidate'
import { auth } from '../utils/firebase-config'
import { db } from '../utils/firebase-config'

type Props = {}

const MainNav = styled.div`
  font-size: 16px;
  border: 1px #d9d9d9 solid;
  background-color: #ffffff;
  padding: 16px;
  text-align: center;
  border-radius: 20px;
  vertical-align: middle;

  display: center;
	align-items: center;
	position: sticky;
	top: -5px;
	z-index: 2;
	min-height: 30px;
	width: 99%;

  a {
    text-decoration: none;
    color: inherit;
  }

  span {
    /* color: #b0b0b0; */
    background: linear-gradient(to right, #eb01c4 0%, #ff8c00 100%);
    -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
`

const rotation = keyframes`
  from {
        transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }    
`

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  p {
    line-height: 1.6;

    .bold {
      font-weight: 600;
    }
  }

  .box {
    border: 1px #eee solid;
    max-width: 500px;
    width: 100%;
    background-color: white;
    padding: 32px;
    margin: auto;
    border-radius: 50px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    padding-left: 50px;
    padding-right: 50px;

    .title {
      margin-top: 16px;
      text-align: center;

      .icon {
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2));
      }
    }

    .server {
      border: 1px #ff4646 solid;
      color: #ff4646;
      border-radius: 50px;
      font-size: 14px;
      padding: 13px;
      margin-top: 24px;
      text-align: center;
    }

    .form {
      margin-top: 32px;
      font-size: 14px;

      .form-control {
        margin-bottom: 20px;

        input {
          display: block;
          font: inherit;
          color: inherit;
          width: 100%;
          padding: 13px 16px;
          outline: none;
          border: 1px #ccc solid;
          border-radius: 50px;

          &::placeholder {
            color: #aaa;
          }

          &:focus {
            border-color: #e06500;
          }
        }

        .hint {
          font-size: 13px;
          margin-top: 2px;
          margin-left: 4px;
          color: #ff4646;
          display: none;
        }

        &.error {
          input {
            border-color: #ff4646;
          }

          .hint {
            display: block;
          }
        }
      }

      button {
        font: inherit;
        background: #6db3899c;
        background: -webkit-linear-gradient(to right, #6db3899c, #e06500);
        background: linear-gradient(to right, #6db3899c, #e06500);
        color: white;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 45px;
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 50px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: block;
          animation: ${rotation} 1s linear infinite;
        }
      }
    }

    .info {
      margin-top: 32px;
      margin-bottom: 16px;
      text-align: center;
      font-size: 14px;

      a {
        text-decoration: none;
        color: #e06500;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }

        @media (hover: none) {
          &:active {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 640px) {
    .box {
      border: none;
      box-shadow: none;
      padding: 16px;
    }
  }
`

export default function SignUp({ }: Props) {
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [startNameValidation, setStartNameValidation] = useState(false)
  const [startEmailValidation, setStartEmailValidation] = useState(false)
  const [startPasswordValidation, setStartPasswordValidation] = useState(false)
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user)

  if (user) {
    router.replace('/browse')
  }

  const isNameValid = nameInput.length !== 0;
  const isEmailValid = emailInput.length !== 0 && validateEmail(emailInput)
  const isPasswordValid =
    passwordInput.length !== 0 && validatePassword(passwordInput)

  const nameInputHandler = (ev) => {
    setServerErrorMessage('')
    setNameInput(ev.target.value)
  };

  const emailInputHandler = (ev) => {
    setServerErrorMessage('')
    setEmailInput(ev.target.value)
  };

  const passwordInputHandler = (ev) => {
    setServerErrorMessage('')
    setPasswordInput(ev.target.value)
  };

  const submitHandler = (ev) => {
    ev.preventDefault()

    setStartNameValidation(true)
    setStartEmailValidation(true)
    setStartPasswordValidation(true)

    if (isNameValid && isEmailValid && isPasswordValid && !serverErrorMessage) {
      setIsLoading(true)
      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
          const uid = userCredential.user.uid
          setDoc(doc(db, uid, 'account'), {
            name: nameInput,
            email: emailInput,
          })
            .then(() => {
              setDoc(doc(db, uid, 'cart'), {
                items: [],
              })
            })

        })
        .catch((error) => {
          const errorCode = error.code

          if (errorCode === 'auth/email-already-in-use') {
            setServerErrorMessage('Email address already in use.')
          } else {
            setServerErrorMessage('Something went wrong.')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Sign Up</span>
      </MainNav>
      <Div>
        {user ? (
          <>
            <p>
              You are logged in as <span className="bold">{user.email}</span>.
              You'll now be redirected.
            </p>
          </>
        ) : (
          <>
            <div className="box">
              <div className="title">
                <LogoIcon />
              </div>
              {serverErrorMessage && (
                <div className="server">{serverErrorMessage}</div>
              )}
              <form className="form" onSubmit={submitHandler}>
                <div
                  className={`form-control ${startNameValidation ? (isNameValid ? '' : 'error') : ''
                    }`}
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={nameInput}
                    onChange={nameInputHandler}
                    onBlur={() => setStartNameValidation(false)}
                  />
                  <span className="hint">Name cannot be empty</span>
                </div>
                <div
                  className={`form-control ${startEmailValidation ? (isEmailValid ? '' : 'error') : ''
                    }`}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={emailInput}
                    onChange={emailInputHandler}
                    onBlur={() => setStartEmailValidation(false)}
                  />
                  <span className="hint">{`${startEmailValidation
                    ? emailInput.length === 0
                      ? 'Email cannot be empty'
                      : !validateEmail(emailInput)
                        ? 'Email is not valid'
                        : ''
                    : ''
                    }`}</span>
                </div>
                <div
                  className={`form-control ${startPasswordValidation
                    ? isPasswordValid
                      ? ''
                      : 'error'
                    : ''
                    }`}
                >
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={passwordInputHandler}
                    onBlur={() => setStartPasswordValidation(false)}
                  />
                  <span className="hint">{`${startPasswordValidation
                    ? passwordInput.length === 0
                      ? 'Password cannot be empty'
                      : !validatePassword(passwordInput)
                        ? 'Min 6 characters required'
                        : ''
                    : ''
                    }`}</span>
                </div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? <span className="loader"></span> : 'Sign Up'}
                </button>
              </form>
              <p className="info">
                Do you have an account? <Link href="/login">Log In</Link>
              </p>
            </div>
          </>
        )}
      </Div>
    </>
  )
}