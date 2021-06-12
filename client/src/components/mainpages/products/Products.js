import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import LoadMore from './LoadMore'
import OwlCarousel from "react-owl-carousel";
import Filters from './Filters'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import slide1 from '../../../img/slider/home-1/slide-1.jpg'
import slide2 from '../../../img/slider/home-1/slide-2.jpg'
import slide3 from '../../../img/slider/home-1/slide-3.jpg'
import promo1 from '../../../img/slider/home-1/promotion-1.jpg'
import promo2 from '../../../img/slider/home-1/promotion-2.jpg'



function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [productsMen, setProductsMen] = state.productsAPI.productsMen
    const [productsWoman, setProductsWoman] = state.productsAPI.productWoman
    const [productsChildren, setProductsChildren] = state.productsAPI.productChildren
    const [categories] = state.categoriesAPI.categories
    
    console.log(categories)
    
    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
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

    const options = {
        margin: 10,
        responsiveClass: true,
        dots: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 5,
    
            }
        },
        autoplay: true,
        loop: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000
    };
    
    if(loading) return <div><Loading /></div>
    return (
        <>
        {/* <Filters /> */}
        {
            !isAdmin &&
            <div id="homepage-1">
                <div class="ps-home-banner ps-home-banner--1">
                    <div class="ps-container">
                        <div class="ps-section__left">
                        <OwlCarousel className="owl-theme carsoul" loop margin={10} items={1} autoplay={true} autoplayTimeout={5000} autoplaySpeed={2500}>
                            <img src={slide1} />
                            <img src={slide2} />
                            <img src={slide3} /> 
                        </OwlCarousel>           
                        </div>
                        <div class="ps-section__right"><a class="ps-collection" href="#"><img src={promo1} alt="" /></a><a class="ps-collection" href="#"><img src={promo2} alt=""/></a></div>
                    </div>
                </div>

                {/* <div class="ps-deal-of-day">
                    <div class="ps-container">
                        <div class="ps-section__header">
                        <div class="ps-block--countdown-deal">
                        <div class="ps-block__left">
                            <h3>Mens</h3>
                        </div>
                            
                        </div><a href="shop-default.html">View all</a>
                        </div>
                        <div class="ps-section__content">
                            <OwlCarousel className="owl-theme" nav={true} loop margin={10} items={5} autoplay={true} autoplayTimeout={5000} autoplaySpeed={2500} autoplayHoverPause={true}>
                                {   
                
                                    productsMen.slice(0,6).map(product => {
                                        return <ProductItem key={product._id} product={product}
                                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                    })
                                }  
                            </OwlCarousel> 
                        </div>
                    </div>
                </div>   */}

                <div class="ps-product-list ps-clothings">
                    <div class="ps-container">
                        <div class="ps-section__header">
                            <h3>Mens</h3>  
                            <ul class="ps-section__links">
                                <Link to="/category/5ff6fa504813bf55c4caab7e">View All</Link>
                            </ul>
                        </div>
                        <div class="ps-section__content">
                        <OwlCarousel className="owl-theme" {...options} >
                                {   
                
                                    productsMen.slice(0,6).map(product => {
                                        return <ProductItem key={product._id} product={product}
                                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                    })
                                }  
                        </OwlCarousel> 
                        </div>

                        <div class="ps-section__header">
                            <h3>Womens</h3>  
                            <ul class="ps-section__links">
                                <Link to="/category/5ff6fad54813bf55c4caab7f">View All</Link>
                            </ul>
                        </div>
                        <div class="ps-section__content">
                        <OwlCarousel className="owl-theme" {...options} >
                                {   
                
                                    productsWoman.slice(0,6).map(product => {
                                        return <ProductItem key={product._id} product={product}
                                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                    })
                                }  
                        </OwlCarousel> 
                        </div>

                        <div class="ps-section__header mt-5">
                            <h3>Children</h3>  
                            <ul class="ps-section__links">
                                <Link to="/category/5ff6fae34813bf55c4caab80">View All</Link>
                            </ul>
                        </div>
                        <div class="ps-section__content">
                        <OwlCarousel className="owl-theme" {...options} >
                                {   
                
                                    productsChildren.slice(0,6).map(product => {
                                        return <ProductItem key={product._id} product={product}
                                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                    })
                                }  
                        </OwlCarousel> 
                        </div>
                    </div>
                </div>
            </div>
            


        }

        
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
                {products.length === 0 && <Loading />}
            </div>
        
        }

        {/* {
          !isAdmin &&
          <div className="products">
            {   
                
                productsMen.slice(0,6).map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            }  
        </div>

        
        }

        {
          !isAdmin && 
        <div className="products">
            
            {
                productsWoman.slice(0,6).map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>
    
        
        } */}

        </>
    )
}

export default Products
