import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'

function Footer() {

    return(
        <footer class="ps-footer">
                <div class="container">
                    <div class="ps-footer__widgets">
                        <aside class="widget widget_footer widget_contact-us">
                            <h4 class="widget-title">Contact us</h4>
                            <div class="widget_content">
                                <h3>Call us 24/7</h3>
                                <p>Order related inquiries: +94 777 815 815 <br/>General Information: +94 112 148 400</p>
                                <p>D Samsons & Sons (Pvt) Ltd,<br/>
                                257, High Level Road, Nawinna, Maharagama,<br/> Sri Lanka.</p>
                                <ul class="ps-list--social">
                                    <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a class="google-plus" href="#"><i class="fa fa-google-plus"></i></a></li>
                                    <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </aside>
                        <aside class="widget widget_footer">
                            <h4 class="widget-title">Quick links</h4>
                            <ul class="ps-list--link">
                                <li><a href="#">Policy</a></li>
                                <li><a href="#">Term & Condition</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Return</a></li>
                                <li><a href="faqs.html">FAQs</a></li>
                            </ul>
                        </aside>
                        <aside class="widget widget_footer">
                            <h4 class="widget-title">Company</h4>
                            <ul class="ps-list--link">
                                <li><a href="about-us.html">About Us</a></li>
                                <li><a href="#">Affilate</a></li>
                                <li><a href="#">Career</a></li>
                                <li><a href="contact-us.html">Contact</a></li>
                            </ul>
                        </aside>
                        <aside class="widget widget_footer">
                            <h4 class="widget-title">Bussiness</h4>
                            <ul class="ps-list--link">
                                <li><a href="#">Our Press</a></li>
                                <li><a href="checkout.html">Checkout</a></li>
                                <li><a href="my-account.html">My account</a></li>
                                <li><a href="shop-default.html">Shop</a></li>
                            </ul>
                        </aside>
                    </div>
                    <div class="ps-footer__copyright">
                        <p>© 2021 DSI. All Rights Reserved</p>
                        <p><span>We Using Safe Payment For:</span><a href="#"><img src="img/payment-method/1.jpg" alt=""/></a><a href="#"><img src="img/payment-method/2.jpg" alt=""/></a><a href="#"><img src="img/payment-method/3.jpg" alt=""/></a><a href="#"><img src="img/payment-method/4.jpg" alt=""/></a><a href="#"><img src="img/payment-method/5.jpg" alt=""/></a></p>
                    </div>
                </div>
        </footer> 
    )

  

}

export default Footer