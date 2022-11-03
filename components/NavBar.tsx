import { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'

import { LogoIcon, CartIcon, UserIcon } from '../assets/logos'
import LoginPanel from './LoginPanel'
import SuperLink from './SuperLink'
import { auth } from '../utils/firebase-config'
import { useRouter } from 'next/router'

type Props = {}

const Div = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;

  .title {
    margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      text-decoration: none;
      color: inherit;

      .icon {
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
      }

      p {
        font-size: 24px;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }

  .box {
    display: flex;
    align-items: stretch;

    .nav-items {
      list-style-type: none;
      color: inherit;
      display: flex;
      align-items: center;

      .nav-item {
        display: flex;
        align-items: center;
        padding: 8px;
        position: relative;

        &:first-child {
          margin-right: 8px;
        }

        a {
          text-decoration: none;
          color: inherit;

          .badge {
            font-size: 10px;
            font-weight: 600;
            /* background-color: #e0a800; */
            background: -webkit-linear-gradient(to right, #eb01c4, #ff8c00);
            background: linear-gradient(to right, #eb01c4, #ff8c00);
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 5px;
            right: 1px;
            z-index: 10;

            @media (max-width: 640px) {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }

    .user-nav {
      border-top: 3px transparent solid;
      border-bottom: 3px transparent solid;
      display: flex;
      position: relative;

      button {
        background-color: white;
        border: none;
        padding: 16px;
      }

      &.active {
        border-bottom-color: #ff4d07;
      }
    }
  }

  @media (max-width: 640px) {
    .title {
      a {
        padding: 0;

        .icon {
          width: 38px;
        }

        p {
          font-size: 22px;
        }
      }
    }

    .box {
      .nav-items {
        .nav-item {
          padding: 6px;
        }
      }

      .user-nav {
        button {
          padding: 10px;
        }
      }
    }
  }
`

export default function NavBar({ }: Props) {
  const router = useRouter()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const cartItems = useSelector((state: any) => state.cart.items)
  const cartCount = cartItems.reduce(
    (prev, cur) => prev + +cur.itemQuantity,
    0
  )

  const toggleMenuHandler = () => {
    if (isMenuVisible) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const openMenu = () => {
    setIsMenuVisible(true)
  }

  const closeMenu = () => {
    setIsMenuVisible(false)
  }

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        closeMenu()
      })
      .catch((error) => {
        console.log(error)
      })
    router.replace('/')
  }
  return (
    <Div>
      <h1 className="title">
        <SuperLink href="/">
          <LogoIcon />
          <p>scalar</p>
        </SuperLink>
      </h1>
      <div className="box">
        <ul className="nav-items">
          <li className="nav-item">
            <SuperLink href="/cart">
              <CartIcon />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </SuperLink>
          </li>
        </ul>
        <div className={`user-nav ${isMenuVisible ? 'active' : ''}`}>
          <button onClick={toggleMenuHandler}>
            <UserIcon />
          </button>
          {isMenuVisible && (
            <LoginPanel onClose={closeMenu} onLogOut={logOutHandler} />
          )}
        </div>
      </div>
    </Div>
  )
}