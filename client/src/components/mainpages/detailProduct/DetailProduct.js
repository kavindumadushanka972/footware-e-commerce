import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import OwlCarousel from "react-owl-carousel";


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [productsMen] = state.productsAPI.productsMen
    const [productsWoman] = state.productsAPI.productWoman
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const [category, setCategory] = state.productsAPI.category

    window.scrollTo(500, 0);

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

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) {
                    setDetailProduct(product) 
                    setCategory('')
                }
            })
        }
    },[params.id, products])

    useEffect(() =>{
        if(params.id){

            productsMen.forEach(product => {
                if(product._id === params.id) {
                    setDetailProduct(product) 
                    setCategory("category="+product.category)
                }
            })
        }
    },[params.id, products])

    useEffect(() =>{
        if(params.id){

            productsWoman.forEach(product => {
                if(product._id === params.id) {
                    setDetailProduct(product) 
                    setCategory("category="+product.category)
                }
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>  
            <div class="ps-page--product ps-page--product-box">
                <div class="container">
                    <div class="ps-product--detail ps-product--box">
                        <div class="ps-product__header ps-product__box">
                            <div class="ps-product__thumbnail" data-vertical="true">
                                <figure>
                                    <div class="ps-wrapper">
                                        <div class="ps-product__gallery" data-arrow="true">
                                            <div class="item"><img src={detailProduct.images.url} alt=""/></div>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        <div class="ps-product__info">
                            <h1>{detailProduct.title}</h1>
                            <div >
                                <p>#id: {detailProduct.product_id}</p>
                            </div>
                            <p class="ps-product__price">Rs {detailProduct.price}</p>
                            <div class="ps-product__desc">
                                <p>Sold: <strong>{detailProduct.sold}</strong></p>
                                <ul class="ps-list--dot">
                                    <li>{detailProduct.description}</li>
                                    <li>{detailProduct.content}</li>
                                </ul>
                            </div>
                            {/* <div class="ps-product__shopping"> */}
                                <Link to="/cart" class="ps-btn"
                                onClick={() => addCart(detailProduct)}>
                                    Add to cart
                                </Link>
                            {/* </div> */}
                        </div>
                    </div>
                </div>

                
                <div class="container">
                <div class="ps-section__header">
                    <h3>Related products</h3>
                </div>
                <hr />
                <div class="ps-section__content">
                        <OwlCarousel className="owl-theme" {...options} >
                            {
                                products.map(product => {
                                    return product.category === detailProduct.category 
                                        ? <ProductItem key={product._id} product={product} /> : null
                                })
                            }
                        </OwlCarousel> 
                        </div>
                
                {/* <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div> */}
            </div>
        
            </div>
        </div>




            {/* <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div> */}
        </>
    )
}

export default DetailProduct
