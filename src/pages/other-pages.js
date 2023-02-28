import {useEffect} from 'react'
import confetti from 'canvas-confetti'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer'
import Header from '../components/header'
import Cart from './cart';
import Checkout from './checkout';
import ErrorPage from './error';
import ProductDetail from "./product-detail";
import Shop from "./shop";
import Thankyou from './thank-you';
import Wishlist from "./wishlist";

export default function OtherPage() {
    useEffect(() => {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
        
        var interval = setInterval(function() {
          var timeLeft = animationEnd - Date.now();
        
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
        
          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    
      return () => {
        
      }
    }, )
    
  return (
      <>
          <Header />
          <Routes>
              <Route path='/shop' element={<Shop />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='/wishlist' element={<Wishlist />}/>
              <Route path='/thank-you' element={<Thankyou />}/>
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='/products/:id' element={<ProductDetail />}/>
              <Route path='/products' element={<Shop />}/>
              <Route path='*' element={<ErrorPage />}/>
          </Routes>
          <Footer />
      </>
  )
}
