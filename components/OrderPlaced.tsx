import styled from 'styled-components'
import Link from 'next/link'

import { CheckIcon } from '../assets/logos'

type Props = {}

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .round {
    /* border: 1px #eee solid;
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(255, 179, 0, 0.5);
    width: 82px;
    height: 82px; */

    .icon {
      border: 3px #e06500 solid;
      border-radius: 50%;
      padding: 8px;
      width: 64px;
      height: 64px;
      stroke-width: 1.5px;
      color: #e06500;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`

export default function OrderPlaced({ }: Props) {
  return (
    <Div>
      <div className="round">
        <CheckIcon />
      </div>
      <h2 className="title">Order placed successfully</h2>
      <p className="text">{`Thank you for support us <3`}</p>
      <Link href="/browse">Continue Shopping</Link>
    </Div>
  )
}