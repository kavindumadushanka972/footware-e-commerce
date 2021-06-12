import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import Cart2 from './icon/cart2.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import logo from './icon/footgear-2.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ReactNavbar from "react-responsive-animate-navbar";
import {background} from '../../img/promotions/home-2-1.jpg'
import flag from '../../img/flag/en.png'
import fr from '../../img/flag/fr.png'
import gr from '../../img/flag/germany.png'
import Filters from '../mainpages/products/Filters'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [categories] = state.categoriesAPI.categories
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const adminRouter_side = () =>{
        return(
            <>
                <li class="current-menu-item"><Link to="/create_product">Create Product</Link></li>
                <li class="current-menu-item"><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const adminRouter_tb = () =>{
        return(
            <>
                <td><Link to="/create_product">Create Product</Link></td>
                <td><Link to="/category">Categories</Link></td>
            </>
        )
    }


    const loggedRouter = () =>{
        return(
            <>
                <Link to='/history'>History</Link>
                <Link to='/' onClick={logoutUser}>Logout</Link>
            </>
        )
    }

    const loggedRouter_side = () =>{
        return(
            <>
                <li class="current-menu-item"><Link to='/history'>History</Link></li>
                <li class="current-menu-item"><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        

        <div>
            <div class="ps-block--promotion-header bg--cover" data-background="img/promotions/header-promotion.jpg">
                <div class="container">
                <div class="ps-block__left">
                    <h3>DSI</h3>
                    <figure>
                        <h4>Sri Lanka's No: 1 Footwear</h4>
                    </figure>
                </div>
                <div class="ps-block__center">
                    <span>Welcome to our Online Shopping Store</span>
                </div><Link to='/' class="ps-btn ps-btn--sm">Shop now</Link>
                </div>
            </div>

            

            {/* <Navbar bg="light" variant="light" expand="lg" className='try'>
                
                <Navbar.Brand href="/" className="brand">{isAdmin ? 'Admin' : <img src={logo} alt="" width="200" />}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><h4>{isAdmin ? 'Products' : 'Shop'}</h4></Nav.Link>
                    {isAdmin && adminRouter()}
                    
                {
                    isLogged ? loggedRouter() : <Nav.Link href="/login">Login ✥ Register</Nav.Link>
                }
                </Nav>
                <Nav>
                {
                    isAdmin ? '' 
                    :<Button  variant="info" href='/cart'>
                    <img src={Cart2} alt="" width="30" className="cart" /> <Badge variant="danger">{cart.length}</Badge>
                  </Button>
                }
                </Nav>
                
                </Navbar.Collapse>  
        </Navbar> */}

            <div>
                <header class="header header--standard header--market-place-1 sticky" data-sticky="true">
                <div class="header__content">
                    <div class="container">
                        <div class="header__content-left">
                            <div class="menu--product-categories">
                                <div class="menu__toggle"><i class="icon-menu"></i><a href='/'>{<img src={logo} alt="" width="200" />}</a></div>
                                <div class="menu__content">
                                    <ul class="menu--dropdown">
                                        <li><Link to="/">Home</Link></li>
                                        {isAdmin && adminRouter()}

                                        {
                                            categories.map(items => (
                                                
                                                     <li><Link to={`/category/${items._id}`}>{items.name}</Link></li>
                                                
                                            ))
                                        }
                                        <li><Link to="/ProductsAll">Search</Link></li>
                                    </ul>   
                                        
                                            
                                </div>         
                            </div><Link to='/' className="ps-logo">{<img src={logo} alt="" width="200" />}</Link>
                        </div>
                        <div class="header__content-center">
                            <form className="ps-form--quick-search">
                                <img className="ml-auto" src="img/banner3.jpg" alt="" srcset="" height="35px" />
                                <img className="ml-2" src="img/banner2.jpg" alt="" srcset="" height="35px" />
                                {/* <div class="form-group--icon"><i class="icon-chevron-down"></i>
                                    <select class="form-control">
                                        <option value="1">All</option>
                                        <option value="1">Bags</option>
                                        <option value="1">Shoes</option>
                                        <option value="1">Men</option>
                                        <option value="1">Women</option>
                                        <option value="1">Sunglasses</option>
                                    </select>
                                </div>
                                <input class="form-control" type="text" placeholder="I'm shopping for..." />
                                <button className="btn btn-lg">Search</button> */}
                            </form>
                        </div>
                        <div class="header__content-right">
                            <div class="ps-cart--mini">
                            {
                                isAdmin ? '' 
                                :<Link className="header__extra" to='/cart'><i class="icon-bag2"></i><span><i>{cart.length}</i></span></Link>
                            }
                            </div>
                        </div>
                        <div class="ps-block--user-header">
                            <div class="ps-block__left"><i class="icon-user"></i></div>
                            <div class="ps-block__right">
                            {
                                isLogged ? loggedRouter() : 
                                <>
                                <p></p>
                                <Link to="/login">Login / Register</Link>
                                </>
                            }
                            </div>
                        </div>
                        
                    </div>
                </div>
                    {
                        
                        <>
                        <div className='navbar'>
                        <table>
                            <tbody>
                                {
                                    !isAdmin &&
                                    <td><Link to="/">Home</Link></td>
                                }
                            
                            {isAdmin && adminRouter_tb()}
                                
                                {
                                 !isAdmin &&
                                 categories.map(items => (
                                        
                                            <td><Link to={`/category/${items._id}`}>{items.name}</Link></td>
                                        
                                    ))
                                }
                                <td><Link to="/ProductsAll">Search</Link></td>
                            </tbody>
                        </table>
                        </div>  
                        </>
                        
                    }
                </header>
                <header class="header header--mobile full" data-sticky="true">
                    <div class="header__top">
                        <div class="header__left">
                            <p>Welcome to DSI Online Shopping Store !</p>
                        </div>
                        <div class="header__right">
                            <ul class="navigation__extra">
                                <li><a href="#">Sell on Martfury</a></li>
                                <li><a href="#">Tract your order</a></li>
                                <li>
                                    <div class="ps-dropdown"><a href="#">US Dollar</a>
                                        <ul class="ps-dropdown-menu">
                                            <li><a href="#">Us Dollar</a></li>
                                            <li><a href="#">Euro</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="ps-dropdown language"><a href="#"><img src="img/flag/en.png" alt=""/>English</a>
                                        <ul class="ps-dropdown-menu">
                                            <li><a href="#"><img src="img/flag/germany.png" alt=""/> Germany</a></li>
                                            <li><a href="#"><img src="img/flag/fr.png" alt=""/> France</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="navigation--mobile">
                        <div class="navigation__left"><Link to='/'>{<img src={logo} alt="" width="100" />}</Link></div>
                        <div class="navigation__right">
                            <div class="header__actions">
                                <div class="ps-cart--mini">
                                {
                                    isAdmin ? '' 
                                    :<Link className="header__extra" to='/cart'><i class="icon-bag2"></i><span><i>{cart.length}</i></span></Link>
                                }
                                </div>
                                {/* <div class="ps-block--user-header">
                                    <div class="ps-block__left"><i class="icon-user"></i></div>
                                    <div class="ps-block__right">
                                    {
                                        isLogged ? loggedRouter() : 
                                        <>
                                        <p></p>
                                        <Link to="/login">Login / Register</Link>
                                        </>
                                    }
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="ps-search--mobile">
                        <form class="ps-form--search-mobile" action="index.html" method="get">
                            <div class="form-group--nest">
                                <input class="form-control" type="text" placeholder="Search something..." />
                                <button><i class="icon-magnifier"></i></button>
                            </div>
                        </form>
                    </div>
                    
                </header>

                <div class="ps-panel--sidebar" id="cart-mobile">
                    <div class="ps-panel__header">
                        <h3>Shopping Cart</h3>
                    </div>
                </div>
                <div class="ps-panel--sidebar" id="navigation-mobile">
                    <div class="ps-panel__header">
                        <h3>Categories</h3>
                    </div>
                    <div class="ps-panel__content">
                        <ul class="menu--mobile">
                        {
                                 
                            categories.map(items => (
                                
                                <li><a href={`/category/${items._id}`}>{items.name}</a></li>
                                
                            ))
                        }
                        </ul>
                    </div>
                        
                    
                </div>
                <div class="navigation--list">
                    <div class="navigation__content"><a class="navigation__item ps-toggle--sidebar" href="#menu-mobile"><i class="icon-menu"></i><span>Menu</span></a><a class="navigation__item ps-toggle--sidebar" href="#navigation-mobile"><i class="icon-list4"></i><span>Categories</span></a><a class="navigation__item ps-toggle--sidebar" href="#search-sidebar"><i class="icon-magnifier"></i><span> Search</span></a><a class="navigation__item ps-toggle--sidebar" href="#cart-mobile"><i class="icon-bag2"></i><span> Cart</span></a></div>
                </div>
                <div class="ps-panel--sidebar" id="search-sidebar">
                <div class="ps-panel__header">
                    <form class="ps-form--search-mobile" action="index.html" method="get">
                        <div class="form-group--nest">
                            <input class="form-control" type="text" placeholder="Search something..." />
                            <button><i class="icon-magnifier"></i></button>
                        </div>
                    </form>
                </div>
                    <div class="navigation__content"></div>
                </div>
                <div class="ps-panel--sidebar" id="menu-mobile">
                    <div class="ps-panel__header">
                        <h3>Menu</h3>
                    </div>
                    <div class="ps-panel__content">
                        <ul class="menu--mobile">
                            <li class="current-menu-item"><a href="/">Home</a></li> 
                            {isAdmin && adminRouter_side()}
                            {
                                isLogged ? loggedRouter_side() : 
                                <li class="current-menu-item"><a href="/login">Login / Register</a></li>
                                
                                        
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default Header
