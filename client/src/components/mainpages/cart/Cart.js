import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import {Link} from 'react-router-dom'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div class="ps-section--shopping ps-shopping-cart">
            <div class="container">
                <div class="ps-section__content">
                    <div class="table-responsive">
                        <table class="table ps-table--shopping-cart">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>TOTAL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    cart.map(product => (
                                        <>
                                            <tr>
                                                <td>
                                                    <div class="ps-product--cart">
                                                        <div class="ps-product__thumbnail"><img src={product.images.url} alt="" /></div>
                                                        <div class="ps-product__content">{product.title}</div>
                                                        <p>{product.description}</p>
                                                    </div>
                                                </td>
                                                <td class="price">$ {product.price}</td>
                                                <td>
                                                <div class="form-group--number">
                                                    <button class="up" onClick={() => increment(product._id)}>+</button>
                                                    <button class="down" onClick={() => decrement(product._id)}>-</button>
                                                    <span>{product.quantity}</span>
                                                </div>
                                                </td>
                                                <td>$ {product.price * product.quantity}</td>
                                                <td onClick={() => removeProduct(product._id)}><i class="icon-cross"></i></td>
                                            </tr>
                                        </>
                                    ))
                                }
                                
                            </tbody>
                        </table>

                        <div class="container ps-section__footer">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                    <div class="ps-block--shopping-total">
                                        <div class="ps-block__header">
                                            <p>Subtotal <span> $ {total}</span></p>
                                        </div>
                                        <div class="ps-block__content">
                                            <ul class="ps-block__product">
                                                {
                                                    cart.map(product => (
                                                        <li><span class="ps-block__shop">{product.title}</span><span class="ps-block__shipping">{product.description}</span><span class="ps-block__estimate">{product.title} x {product.quantity}</span></li>
                                                    ))
                                                }
                                            </ul>
                                            <h3>Total <span>$ {total}</span></h3>
                                        </div>
                                        </div>
                                        
                                </div>
                            </div>
                                 <div className="total">
                                    <PaypalButton
                                    total={total}
                                    tranSuccess={tranSuccess} />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     {
        //         cart.map(product => (
        //             <div className="detail cart" key={product._id}>
        //                 <img src={product.images.url} alt="" />

        //                 <div className="box-detail">
        //                     <h2>{product.title}</h2>

        //                     <h3>$ {product.price * product.quantity}</h3>
        //                     <p>{product.description}</p>
        //                     <p>{product.content}</p>

        //                     <div className="amount">
        //                         <button onClick={() => decrement(product._id)}> - </button>
        //                         <span>{product.quantity}</span>
        //                         <button onClick={() => increment(product._id)}> + </button>
        //                     </div>
                            
        //                     <div className="delete" 
        //                     onClick={() => removeProduct(product._id)}>
        //                         X
        //                     </div>
        //                 </div>
        //             </div>
        //         ))
        //     }

        //     <div className="total">
        //         <h3>Total: $ {total}</h3>
        //         <PaypalButton
        //         total={total}
        //         tranSuccess={tranSuccess} />
        //     </div>
        // </div>
    )
}

export default Cart
