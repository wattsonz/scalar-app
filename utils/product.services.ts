import { db } from "./firebase-config"
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
    onSnapshot
} from "firebase/firestore"

class ProductService {
    async getProducts() {
        const products = await getDocs(collection(db, "products"))
        return products.docs.map(doc => doc.data())
    }

    async getProduct(id: string) {
        const product = await getDoc(doc(db, "products", id))
        return product.data()
    }

    async addProduct(product: any) {
        const docRef = await addDoc(collection(db, "products"), product)
        return docRef.id
    }

    async updateProduct(id: string, product: any) {
        await updateDoc(doc(db, "products", id), product)
    }

    async deleteProduct(id: string) {
        await deleteDoc(doc(db, "products", id))
    }

    getProductById(pid) {
        let fetched = false
        return new Promise<Array<object>>((resolve, reject) => {
            const q = query(collection(db, 'products'), where("id", "==", pid))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                // console.log('unsubscribe')
                const item = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
                if (!fetched) {
                    fetched = true
                    resolve(item)
                } else {
                    // console.log('false from product.services')
                }
            })
        })
    }

}

export default new ProductService()