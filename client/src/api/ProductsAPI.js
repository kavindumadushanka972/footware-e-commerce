import {useState, useEffect, useContext} from 'react'
import axios from 'axios'


function ProductsAPI() {
    
    const [products, setProducts] = useState([])
    const [productsMen, setProductsMen] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [categoryMen, setCategoryMen] = useState('5ff6fa504813bf55c4caab7e')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [resultMen, setResultMen] = useState(0)
    const [categoryWoman, setCategoryWoman] = useState('5ff6fad54813bf55c4caab7f')
    const [categoryChildren, setCategoryChildren] = useState('5ff6fae34813bf55c4caab80')
    const [productWoman, setProductsWoman] = useState([])
    const [resultWoman, setResultWoman] = useState(0)
    const [productChildren, setProductsChildren] = useState([])
    const [resultChildren, setResultChildren] = useState(0)
    

    useEffect(() =>{
        const getProducts = async () => {
    
            const resWoman = await axios.get(`/api/products?limit=${page*6}&category=${categoryWoman}&${sort}&title[regex]=${search}`)
            setProductsWoman(resWoman.data.products)
            setResultWoman(resWoman.data.result)
            console.log(resWoman.data.products)
            console.log(resWoman.data.result)
        }
        getProducts()
    },[callback, category, sort, search, page])

    
    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page*6}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
            
        }
        getProducts()
    },[callback, category, sort, search, page])

    useEffect(() =>{
        const getProducts = async () => {
    
            const resMen = await axios.get(`/api/products?limit=${page*6}&category=${categoryMen}&${sort}&title[regex]=${search}`)
            setProductsMen(resMen.data.products)
            setResultMen(resMen.data.result)
        }
        getProducts()
    },[callback, category, sort, search, page])

    useEffect(() =>{
        const getProducts = async () => {
    
            const resChildren = await axios.get(`/api/products?limit=${page*6}&category=${categoryChildren}&${sort}&title[regex]=${search}`)
            setProductsChildren(resChildren.data.products)
            setResultChildren(resChildren.data.result)
        }
        getProducts()
    },[callback, category, sort, search, page])
    
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        productsMen: [productsMen, setProductsMen],
        resultsMen: [resultMen, setResultMen],
        categoryMen: [categoryMen, setCategoryMen],
        categoryWoman: [categoryWoman, setCategoryWoman],
        productWoman: [productWoman, setProductsWoman],
        resultWoman: [resultWoman, setResultWoman],
        categoryMen: [categoryChildren, setCategoryChildren],
        productChildren: [productChildren, setProductsChildren],
        resultChildren: [resultChildren, setResultChildren]

    }
}

export default ProductsAPI
