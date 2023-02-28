import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { appName } from '../base'
import '../styles/header.css'
import CartPopup from './cart-popup'

export default function Header() {
    const [menuActive, setMenuActive] = useState(false)
    const [scrollAssister, setscrollAssister] = useState(false)
    function scrollAssist(e) {
        if (document.documentElement.scrollTop > 10) {
            setscrollAssister(true)
        } else {
            setscrollAssister(false)
            
        }
    }
    useEffect(() => {
        document.onscroll=scrollAssist
        return (
            document.removeEventListener('scroll',scrollAssist)
        )
    })
  return (
      <>
          {scrollAssister && <div className="to-top" onClick={() => {
              document.documentElement.scrollTo({x:0,y:0},{behaviour:"smooth"})
          }}>
              ^
          </div>}
          <div className="header">
              <div className="section1">
                  <div className="logo">{appName ?? "ezone"}</div>
                  <div className="sec1">
                      <Link  to="/">Home</Link>
                      <div href="#" className="pages">Pages
                      <div className="pages-overlay">
                          <Link to="/wishlist">Wishlist</Link>
                          <a href="#">about us</a>
                          <a href="#">contact us</a>
                          <Link to="/cart">cart</Link>
                      </div></div>
                      
                      <Link to="/shop" >shop</Link>
                      <a href="#" >About</a>
                      <a href="#" >contact</a>
                  </div>
                 
          <div className="sec2">
            
                      <div className="cart" data-now={10}>
                      <CartPopup />
                        
                      </div>
            <div className="menu-icon " onClick={()=>setMenuActive(!menuActive)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
          </div>
              </div>
              <div className={`mobile-menu ${menuActive && 'active'}`}>
                  <a href="#" >Home</a>
                      <div href="#" className="pages">Pages
                      <div className="pages-overlay">
                          <a href="#">Whitlist</a>
                          <a href="#">about us</a>
                          <a href="#">contact us</a>
                          <a href="#">cart</a>
                      </div></div>
                      
                      <a href="#" >shop</a>
                      <a href="#" >About</a>
                      <a href="#" >contact</a>
                  </div>
        <div className="section2">
                  <div className="access">
                      get access: <a href='#'>login</a> | <a href="#">reg</a>
                  </div>
                  <div className="search">
                      <input type="text" placeholder="i am searching for ..." />
                      <span></span>
                  </div>
                  <div className="wishlist">
                      <span className="heart"></span>
                      wishlist
                  </div>
        </div>
          </div></>
  )
}
