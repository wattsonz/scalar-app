import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

import { db } from "../../utils/firebase-config"
import ProductService from "../../utils/product.services"
import { getFormattedCurrency } from "../../utils/getFormattedCurrency"

type Props = {
  id: any
  imageURL: any
  brand: any
  category: any
  name: any
  price: any
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
	z-index: 6;
	/* height: 30px; */
	min-height: 30px;
	width: 99%;

  a {
    text-decoration: none;
    color: inherit;
  }

  span {
  background: linear-gradient(to right, #eb01c4 0%, #ff8c00 100%);
  background-clip: text;
	-webkit-text-fill-color: transparent;
  font-weight: bold;
  }
`;

const rotation = keyframes`
  from {
        transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }    
`;

const Div = styled.div`
  padding: 32px;

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;

    .image {
      width: 330px;
    }

    .info {
      margin: 16px;
      padding: 16px;

      .brand {
        font-size: 20px;
        font-weight: 500;
        margin-left: 16px;
      }

      .name {
        color: #777;
        margin: 16px 0;
        margin-left: 16px;
      }

      .price {
        font-size: 20px;
        font-weight: 500;
        margin-left: 16px;
      }

      .size-box {
        margin-top: 32px;

        .head {
          margin-bottom: 16px;
          display: flex;
          align-items: baseline;

          .title {
            font-weight: 500;
          }

          .chart {
            color: #e06500;
            margin-left: 16px;
            font-size: 14px;
            cursor: pointer;

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

        .error {
          margin-bottom: 16px;
          color: #ff4646;
        }

        .sizes {
          display: flex;

          button {
            font: inherit;
            font-size: 14px;
            font-weight: 500;
            border: 1px #ddd solid;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            margin-right: 8px;
            background-color: white;
            cursor: pointer;

            &.active {
              border-color: #e06500;
              color: #e06500;
            }

            &:last-child {
              margin-right: 0;
            }

            @media (hover: hover) {
              transition: border 240ms;

              &:hover {
                border-color: #e06500;
              }
            }
          }
        }
      }

      .actions {
        margin-top: 32px;
        display: flex;

        button {
          font: inherit;
          font-weight: 500;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          cursor: pointer;
          border: none;
          width: 145px;
          height: 48px;
        }

        .cart {
          background: #6db3899c;
          background: -webkit-linear-gradient(to right, #6db3899c, #e06500);
          background: linear-gradient(to right, #6db3899c, #e06500);
          color: white;
          /* margin-left: 0px; */
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
  }

  @media (max-width: 640px) {
    padding: 16px;

    .card {
      flex-direction: column;

      .image {
        width: 100%;
      }

      .info {
        width: 100%;
        padding: 0;
        margin-bottom: 0;

        .brand {
          font-size: 18px;
          font-weight: 500;
        }

        .name {
          color: #777;
          margin: 8px 0;
        }

        .price {
          font-size: 18px;
          font-weight: 500;
        }

        .size-box {
          margin-top: 16px;
        }

        .actions {
          margin-top: 24px;

          button {
            width: 100%;
          }
        }
      }
    }
  }
`;

export default function ProductById({ id, imageURL, brand, category, name, price }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state: any) => state.auth.user);
  const cartItems = useSelector((state: any) => state.cart.items)
  const router = useRouter()

  const cartItem = cartItems.find(
    (item) => item.itemId === id
  );
  const cartItemIndex = cartItems.findIndex(
    (item) => item.itemId === id
  );
  const isInCart = !!cartItem;

  const addToCartHandler = () => {
    if (user) {
      setIsLoading(true)
      if (isInCart) {
        const updatedItem = {
          ...cartItem,
          itemQuantity: (+cartItem.itemQuantity + 1).toString(),
        };
        const updatedItems = [...cartItems];
        updatedItems.splice(cartItemIndex, 1, updatedItem);
        updateDoc(doc(db, user.uid, 'cart'), {
          items: updatedItems,
        })
          .then(() => {
            this.removeItemHandler();
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        updateDoc(doc(db, user.uid, 'cart'), {
          items: arrayUnion({
            itemId: id,
            itemQuantity: '1',
          }),
        })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <MainNav>
        <Link href="/">Home</Link>
        {' / '}
        <Link href="/browse">Showcase</Link>
        {' / '}
        <span>{` ${brand} ${name}`}</span>
      </MainNav>
      <Div>
        <div className="card">
          <div className="image">
            <Image
              src={imageURL}
              width={330}
              height={412}
              layout="responsive"
            />
          </div>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="price">{`${getFormattedCurrency(
              price
            )} Baht`}</div>
            <div className="actions">
              <button
                className="cart"
                onClick={addToCartHandler}
                disabled={isLoading}
              >
                {isLoading ? <span className="loader"></span> : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Div>
    </>
  )
}

export async function getServerSideProps(context) {
  let product = {}
  //console.log('context from [pid] ->', context);

  const pid = context.params.pid
  const promiseItem = ProductService.getProductById(pid)
  promiseItem.then((item) => {
    product = item[0]
  })
  await promiseItem

  return {
    props: { ...product },
  }
}

