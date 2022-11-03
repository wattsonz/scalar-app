import Link from 'next/link'
import styled from 'styled-components'

import { UserIcon2 } from '../assets/logos'

type Props = {
  type: any
}

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .round {
    border: 1px #eee solid;
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(255, 179, 0, 0.5);
    

    .icon {
      margin: 24px 24px;
      width: 32px;
      height: 32px;

      path,
      circle {
        stroke-width: 1px;
      }
    }
  }

  .title {
    margin-top: 24px;
    font-size: 24px;
    font-weight: 500;
  }

  .text {
    margin-top: 24px;
  }

  a {
    display: block;
    margin-top: 30px;
    padding: 14px 42px;
    text-decoration: none;
    background: #6db3899c;
    background: -webkit-linear-gradient(to right, #6db3899c, #e06500);
    background: linear-gradient(to right, #6db3899c, #e06500);
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 50px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.24)
  }
`

export default function ForceLogin({ type }: Props) {
  return (
    <Div>
      <div className="round">
        <UserIcon2 />
      </div>
      <h2 className="title">Please Login</h2>
      <p className="text">Login to access this page</p>
      <Link href="/login">Login</Link>
    </Div>
  )
}