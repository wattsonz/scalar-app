import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'

import ProductService from '../utils/product.services'

type Props = {}

export default function Playground2({ }: Props) {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const products = await ProductService.getProducts()
        setAllProducts(products)
    }

    const products = allProducts.map(item => {
        return <h5 key={item.id}>{item.name}</h5>
    })

    return (
        <>
            <div>{products}</div>
        </>
    )
}