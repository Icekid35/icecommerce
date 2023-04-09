import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer'
import Header from '../components/header'
import NotFoundPage from './404';
import AboutMe from './about';
import Cart from './cart';
import Checkout from './checkout';
import ContactUs from './contact';
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
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='/wishlist' element={<Wishlist />}/>
              <Route path='/thank-you' element={<Thankyou />}/>
              <Route path='/error' element={<ErrorPage />}/>
              <Route path='/products/:id' element={<ProductDetail />}/>
              <Route path='/products' element={<Shop />}/>
              <Route path='/about' element={<AboutMe />}/>
              <Route path='/contact' element={<ContactUs />}/>
              <Route path='*' element={<NotFoundPage />}/>
          </Routes>
          <Footer />
      </>
  )
}
