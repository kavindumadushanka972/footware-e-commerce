import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import LoadMore from './LoadMore'
import {Link, useParams} from 'react-router-dom'



function Category() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [productsMen, setProductsMen] = state.productsAPI.productsMen
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
  
    const categoryNameArr = []
    const categoryIdArr = []
    const params = useParams()

    useEffect(() =>{
        if(params.id){
            setCategory("category=" + params.id)  
        }else{
            setCategory('')
        }
    })
    
    
    categories.forEach(category => {
        categoryNameArr.push(category.name)
        categoryIdArr.push(category._id)
    })


    
    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])

        productsMen.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProductsMen([...productsMen])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        {/* {
            !isAdmin &&
                <>
                <div className='navbar'>
                <table>
                    <tbody>
                        {
                            categories.map(items => (
                                
                                    <td><Link to={`/category/${items._id}`}  name="category" value={"category=" + items._id} >{items.name}</Link></td>
                                
                            ))
                        }
                        <td><Link to="/ProductsAll">Link</Link></td>
                    </tbody>
                </table>
                </div>  
                </>
                
        } */}

       
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>

        }

        {
            isAdmin &&
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}
                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    })
                }
                <LoadMore /> 
            </div>
        
        }

        {
          !isAdmin && 
          <div className="products">
            
            {
                products.map(product => {
                    if(product.category === params.id){
                        return <ProductItem key={product._id} product={product}
                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    }
                    
                })
            } 
        </div>
        
        }
        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    )
}

export default Category
