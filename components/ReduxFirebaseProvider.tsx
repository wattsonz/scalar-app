import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import { auth } from '../utils/firebase-config'
import { authActions } from '../store/slices/authSlice'
import { cartActions } from '../store/slices/cartSlice'
import { db } from "../utils/firebase-config"
import Loading from './Loading'

type Props = {
  children: React.ReactNode
}

export default function ReduxFirebaseProvider({ children }: Props) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const subscriptions = []

  useEffect(() => {
    const authSub = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const userInfo = {
            accessToken: user['accessToken'],
            email: user.email,
            uid: user.uid,
          }
          dispatch(authActions.setUser(userInfo))

          const cartSub = onSnapshot(
            doc(db, user.uid, 'cart'),
            (document) => {
              try {
                const items = document.data().items
                dispatch(cartActions.setItems(items))
                setIsLoading(false)
              } catch (error) {
                setIsLoading(false)
              }
            },
            (error) => {
              console.log('error', error)
              setIsLoading(false)
            }
          )

          subscriptions.push(cartSub)
        } else {
          dispatch(authActions.setUser(null))
          dispatch(cartActions.setItems([]))
          setIsLoading(false)
        }
      },
      (error) => {
        console.log('error', error)
        setIsLoading(false)
      }
    )

    subscriptions.push(authSub)

    const unSubscribeAll = () => {
      subscriptions.forEach((sub) => sub())
      subscriptions.length = 0
    }

    return unSubscribeAll
  }, [])

  return isLoading ? <Loading /> : <>{children}</>
}