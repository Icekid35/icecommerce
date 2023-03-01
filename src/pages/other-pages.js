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
