import { useEffect, useState } from 'react'
import { auth } from '../utils/firebase-config'
import { db } from "../utils/firebase-config"
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    onSnapshot,
    setDoc
} from "firebase/firestore"
import { current } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import ProductService from '../utils/product.services'

type Props = {}

export default function Playground3({ }: Props) {
    const [products, setProducts] = useState([])

    // useEffect(() => {
    //     ProductService.addProduct({
    //         id: "00303",
    //         imageURL: "https://firebasestorage.googleapis.com/v0/b/tiptop-store.appspot.com/o/Ae_Shirt_1.jpg?alt=media",
    //         brand: "Logitech",
    //         category: "Mousepad",
    //         name: "Logitech Mousepad Speed",
    //         price: "3990"
    //     })
    // }, [])

    const addThing = async () => {
        console.log("addThing ON")

        await ProductService.addProduct({
            id: "00303",
            imageURL: "https://firebasestorage.googleapis.com/v0/b/tiptop-store.appspot.com/o/Ae_Shirt_1.jpg?alt=media",
            brand: "Logitech",
            category: "Mousepad",
            name: "Logitech Mousepad Speed",
            price: "3990"
        })
    }

    const setThing = async () => {
        console.log("setThing ON")

        await setDoc(doc(db, 'bb', 'account'), {
            name: 'Ada Lovelace',
            email: 'ada@gmail.com',
        })
    }

    const Credentails = async () => {
        console.log("Credentails ON")

        const emailInput = 'sakura1@gmail.com'
        const passwordInput = '123456'
        const nameInput = 'Sakura Haruno'

        await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                const uid = userCredential.user.uid;
                setDoc(doc(db, uid, 'account'), {
                    name: nameInput,
                    email: emailInput,
                })
                    .then(() => {
                        setDoc(doc(db, uid, 'cart'), {
                            items: [],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }).catch((error) => { new Error(error) })
    }


    // useEffect(() => {
    //     CredentialsService.getExistedCredentials("skyememo@gmail.com")

    // }, [])

    // const addArray = (newArray) => setData(oldArray => [...oldArray, newArray])

    return (
        <>
            <div>test3</div>
            <button onClick={() => { addThing() }}>add thing</button>
            <button onClick={() => { setThing() }}>set thing</button>
            <button onClick={() => { Credentails() }}>add credentails</button>
        </>
    )
}

// export async function getServerSideProps(context) {
//     const credentialsEmail = CredentialsService.getCredentialsByEmail('skyememo@gmail.com')

//     return {
//         props: { credentialsEmail },
//     }
// }
