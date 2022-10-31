import { useEffect } from 'react'
import ProductServices from '../utils/product.services'
import Loading from '../components/Loading'

type Props = {}

export default function Playground4({ }: Props) {

    useEffect(() => {
        const a = fetchProductById('00103')
        let b: any
        console.log(a.then((res) => b = res).then(() => console.log(b)))

    }, [])

    const fetchProductById = (id: string) => {
        const item = ProductServices.getProductById(id)
        return item
    }

    return (
        <>
            <Loading />
        </>
    )
}