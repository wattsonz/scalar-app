import React, { ReactElement } from 'react'
import { Carousel } from 'react-bootstrap'
import Layout from '../components/layout'
import Image from 'next/image'
import Head from 'next/head'
import Button from '@mui/material/Button';

type Props = {}

export default function index({ }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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