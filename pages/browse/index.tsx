import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import BrandFilter from '../../components/BrandFilter'
import CategoryFilter from '../../components/CategoryFilter'
import SortSelect from '../../components/SortSelect'
import ItemCard from '../../components/ItemCard'
import Empty from '../../components/Empty'
import ProductsService from '../../utils/product.services'
// import Loading from '../../components/Loading'

type Props = {
  products: any
  brands: any
  categories: any
}

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
	/* height: 30px; */
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

const Div = styled.div`
  flex: 1;
  display: flex;

  .aside {
    width: 300px;
    padding: 16px;
    /* border: 1px #d9d9d9 solid; */
    /* border-radius: 20px; */
    /* border-top: 0px; */

    .title {
      font-size: 50px;
      font-weight: 500;
      background: linear-gradient(to right, #000000 0%, #f1ff5c 100%);
        -webkit-background-clip: text;
	      -webkit-text-fill-color: transparent;
        font-weight: bold;
    }
  }

  .main {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;

      .title {
        font-size: 50px;
        font-weight: 500;
        margin-right: auto;
        background: linear-gradient(to right, #0191eb 0%, #000000 100%);
        -webkit-background-clip: text;
	      -webkit-text-fill-color: transparent;
        font-weight: bold;
        /* border: #0191eb solid 5px;
        border-radius: 5px; */
        /* padding: 15px; */
      }
    }

    .products {
      margin: 16px 0;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
  }

  @media (max-width: 1024px) {
    .main {
      .products {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }

  @media (max-width: 768px) {
    .main {
      .products {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 640px) {
    .main {
      .top {
        align-items: center;

        .sort-filter {
          display: flex;
        }
      }

      .products {
        margin-bottom: 0;
      }
    }
  }
`

export default function Browse({ products, brands, categories }: Props) {
  const filteredBrands = useSelector((state: any) => state.filter.brands)
  const filteredCategories = useSelector((state: any) => state.filter.categories)
  const filteredSort = useSelector((state: any) => state.filter.sort)

  let filteredProducts: any

  filteredProducts =
    filteredBrands.length > 0
      ? [...products].filter((value) => filteredBrands.includes(value.brand))
      : [...products]

  filteredProducts =
    filteredCategories.length > 0
      ? filteredProducts.filter((value) =>
        filteredCategories.includes(value.category)
      )
      : filteredProducts

  if (filteredSort === 'price_high_to_low') {
    filteredProducts = filteredProducts.sort((a, b) => +b.price - +a.price)
  } else if (filteredSort === 'price_low_to_high') {
    filteredProducts = filteredProducts.sort((a, b) => +a.price - +b.price)
  }
  //console.log('filteredProducts', filteredProducts)

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Browse</span>
      </MainNav>
      <Div>
        <aside className="aside">
          <div className="title">Filters</div>
          <BrandFilter items={brands} />
          <CategoryFilter items={categories} />
        </aside>

        <main className="main">
          <div className="top">
            <div className="title">Showcase</div>
            <SortSelect />
          </div>
          {filteredProducts.length > 0 ? (
            <div className="products">
              {filteredProducts.map((item, index) => (
                <ItemCard key={item.id} {...item} setPriority={index < 8} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </main>
      </Div>
    </>
  )
}

export async function getServerSideProps(context) {
  const items = await ProductsService.getProducts()

  const brands = items.reduce((previous, current) => {
    if (!previous.includes(current.brand)) {
      previous.push(current.brand)
    }

    return previous
  }, [])

  const categories = items.reduce((previous, current) => {
    if (!previous.includes(current.category)) {
      previous.push(current.category)
    }

    return previous
  }, [])

  return {
    props: {
      products: items,
      brands,
      categories,
    },
  }
}