import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import styled, { keyframes } from 'styled-components'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import uniqid from 'uniqid'

import EmptyCart from '../components/EmptyCart'
import CartSingleCard from '../components/CartSingleCard'
import ForceLogin from '../components/ForceLogin'
import OrderPlaced from '../components/OrderPlaced'
import { db } from '../utils/firebase-config'
import ProductService from '../utils/product.services'
import { getFormattedCurrency } from '../utils/getFormattedCurrency'

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
	z-index: 6;
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

const rotation = keyframes`
  from {
        transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }    
`

const Div = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;

  .cart {
    padding-right: 100px;
  }

  .checkout {
    padding: 16px;
    padding-top: 20px;
    margin-top: 50px;
    font-size: 14px;
    width: 280px;
    border: 1px #d9d9d9 solid;
    border-radius: 20px;
    max-height: 260px;

    .basic {
      .title {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 0;
      }

      > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
      }
    }

    .total {
      border-top: 1px #eee solid;
      font-weight: 500;

      .title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 0;
      }

      > div {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        font-size: 16px;
      }

      .order {
        font: inherit;
        border-radius: 50px;
        background: #6db3899c;
        background: -webkit-linear-gradient(to right, #6db3899c, #e06500);
        background: linear-gradient(to right, #6db3899c, #e06500);
        color: white;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 48px;
        outline: none;
        cursor: pointer;
        padding: 14px 28px;
        margin-top: 32px;
        border: none;
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
  }

  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;

    span {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .title2 {
    font-size: 150px;
    font-weight: 500;
    margin-bottom: 16px;
    background: linear-gradient(to right, #a4ea96 0%, #047500 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    
    span {
      font-size: 16px;
      font-weight: 400;
    }
  }

  /* @media (max-width: 640px) {
    flex-direction: column;

    .cart {
      padding: 0;
    }

    .checkout {
      margin-top: 16px;
      padding: 0;
      width: 100%;
    }
  } */
`

export default function Cart({ }: Props) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const user = useSelector((state: any) => state.auth.user)
  const cartItems = useSelector((state: any) => state.cart.items)
  const cartCount = cartItems.reduce(
    (prev, cur) => prev + +cur.itemQuantity,
    0
  )

  //console.log('products', products)

  // const itemDetail1 = ProductService.getProductById('00103')
  // console.log('itemDetail1', itemDetail1)

  // const test = async (cartItems) => {
  //   const itemDetail1 = await ProductService.getProductById('00103')
  //   console.log('itemDetail1', itemDetail1)
  // }

  // test()

  useEffect(() => {
    const fetchItem = async () => {
      const items = await Promise.all(cartItems.map(async (item) => {
        const itemDetails = await ProductService.getProductById(item.itemId)
        const [itemDetail] = itemDetails
        // console.log('itemDetails => ', itemDetail)

        return {
          quantity: item.itemQuantity,
          ...itemDetail,
        };
      }));
      return items
    }

    fetchItem().then((items) => {
      setProducts(() => {
        setIsLoading(false)
        return items
      });
    })

    // const items = cartItems.map((item) => {
    //   const itemDetails = ProductService.getProductById(item.itemId)
    //   return {
    //     quantity: item.itemQuantity,
    //     ...itemDetails,
    //   };
    // });

    // setProducts(() => {
    //   setIsLoading(false);
    //   return items;
    // });
  }, [cartItems])

  const getitemDetails = async (itemId) => {
    const itemDetail = await ProductService.getProductById(itemId)
    //console.log('itemDetail', itemDetail)

    return itemDetail
  }

  const priceValue = products.reduce(
    (prev, cur) => prev + +cur.price * +cur.quantity, 0)
  const totalValue = priceValue

  const placeOrderHandler = () => {
    setIsPlacingOrder(true)
    addDoc(collection(db, 'orders'), {
      items: cartItems,
      totalPrice: totalValue,
    }).then(() => {
      setIsOrderPlaced(true)

      updateDoc(doc(db, user.uid, 'cart'), {
        items: [],
      }).then(() => {
        setIsPlacingOrder(false)
      })
    })
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <Link href="/browse">Browse</Link> / <span>Cart</span>
      </MainNav>
      {isOrderPlaced ? (
        <OrderPlaced />
      ) : (
        !isLoading &&
        (user ? (
          products.length > 0 ? (
            <Div>
              <div className="cart">
                <div className="title2">
                  Cart {cartCount > 0 && <span>{`(${cartCount} items)`}</span>}
                </div>
                <div className="products">
                  {products.map((item, index) => (
                    <CartSingleCard key={uniqid()} index={index} {...item} />
                  ))}
                </div>
              </div>
              <div className="checkout">
                <div className="title">Price details</div>
                <div className="basic">
                  <div className="price">
                    <div className="title">Price</div>
                    <div className="price">{`${getFormattedCurrency(priceValue)} Baht`}</div>
                  </div>
                  <div className="shipping">
                    <div className="title">Shipping</div>
                    <div className="price">FREE</div>
                  </div>
                </div>
                <div className="total">
                  <div className="final">
                    <div className="title">Total Price</div>
                    <div className="price">{`${getFormattedCurrency(totalValue)} Baht`}</div>
                  </div>
                  <button
                    className="order"
                    onClick={placeOrderHandler}
                    disabled={isPlacingOrder}
                  >
                    {isPlacingOrder ? (
                      <span className="loader"></span>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            </Div>
          ) : (
            <EmptyCart />
          )
        ) : (
          <ForceLogin type="cart" />
        ))
      )}
    </>
  )
}