import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'

type Props = {}

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  text-align: center;
  background-color: #fceed3;
  /* border-radius: 50px; */
  border-radius: 50px/ 50px 50px 0px 0px;

  .title {
    font-size: 64px;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to right, #000000 50%, #ff8c00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;

    @media (max-width: 640px) {
      font-size: 56px;
    }
  }

  .text {
    margin-top: 30px;
  }

  .link {
    display: block;
    margin-top: 40px;
    padding: 14px 42px;
    text-decoration: none;
    font-weight: 400;
    border: none;
    border-radius: 50px;
    background: #6db3899c;
    background: -webkit-linear-gradient(to right, #6db3899c, #e06500);
    background: linear-gradient(to right, #6db3899c, #e06500);
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .link-tag {
    display: block;
    margin-top: 40px;
    padding: 2px 10px;
    text-decoration: none;
    font-weight: 400;
    border: none;
    border-radius: 50px;
    background: #6db3899c;
    color: white;
  }
  span {
  /* position: relative; */
  /* z-index: 3; */
  background-image: linear-gradient(transparent 64px, #F243B3 50%, #FFCA47 100%);
}
`

export default function Home({ }: Props) {

  return (
    <>
      <Head>
        <title>scalar | Online Shopping</title>
      </Head>
      <Div>
        <p className="title"><span>Never stop, Ever.</span></p>
        <a className="link-tag" href="https://drive.google.com/file/d/1GXgoYJvvw-EyusMRkVIYIiXWQhdIBbd2/view" target="_blank">@wattson</a>
        <Link href="/browse"><a className="link"><span>BROWSE</span> NOW</a></Link>
      </Div>
    </>

  )
}