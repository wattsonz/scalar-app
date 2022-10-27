import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

type Props = {}

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  text-align: center;
  /* background-color: coral; */

  .title {
    font-size: 64px;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    @media (max-width: 640px) {
      font-size: 56px;
    }
  }

  .text {
    margin-top: 30px;
  }

  a {
    display: block;
    margin-top: 40px;
    padding: 14px 42px;
    text-decoration: none;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    background: #8e2de2;
    background: -webkit-linear-gradient(to right, #e2a32d, #e06500);
    background: linear-gradient(to right, #e2a32d, #e06500);
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export default function index({ }: Props) {

  return (
    <>
      <Head>
        <title>Scala Market</title>
      </Head>
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="/imgs/img1.jpg"
            alt="First slide"
            height="500"
            width="1700"
            layout="responsive"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="/imgs/img2.jpg"
            alt="Second slide"
            height={500}
            width={1700}
            layout="responsive"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="/imgs/img3.png"
            alt="Third slide"
            height={500}
            width={1700}
            layout="responsive"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Content */}

      {/* Content */}
    </Layout>

  )
}