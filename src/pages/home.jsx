import {useEffect} from 'react'

import Card, { CartCard } from "../components/card";
import CardHolder from "../components/cardHolder";
import Footer from "../components/footer";
import "../styles/home.css";
import fake from '../assets/fake.json'
import { useState } from "react";
import CartPopup from "../components/cart-popup";
// import Swiper core and required modules
import { Navigation, A11y, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Banner() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className="overlay-menu"
        style={{ display: showMenu ? "flex" : "none" }}
      >
        <div
          className="cancel-btn"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          X
          {/* <FontAwesomeIcon  className="bg icon" icon={'home'}/> */}
        </div>
        <Link to='/'>home</Link>
        <Link to='/shop'>shop</Link>
        <Link to='/about'>about</Link>
        <Link to='/contact'>contact</Link>
      </div>
      <div className="banner">
        <header>
          <div className="logo">ezone</div>
          <div className="sec2">
            <div className="logreg">
              <div className="login">LOGIN</div>
              <div className="reg">| REG</div>
            </div>
            <div className="cart" data-now={10}>
              {/* <CartCard /> */}
              <CartPopup />
            </div>
          </div>
        </header>

        <div
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="menu-icon"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="banner-text">FASHION</div>
        <div className="banner-subtext">
          Create your own style for better looks
        </div>
      </div>
    </>
  );
}

export default function Home() {
  useEffect(() => {
    toast.success('Welcome ')
  
    return () => {
      
    }
  }, )
  
  return (
    <>
      <Banner />

      <h2 className="">New product</h2>
      <CardHolder>
      {
        fake.sort((a, b) => b.creationAt - a.creationAt).splice(0, 10).map((product) => (
          
          <Card product={product} />
        ))
}
         </CardHolder>

      <div className="advert">
        <img src={require("../assets/bg/35.jpg")} alt="" />
        <div className="advert-text">
          20% off for women collection
          <div className="action-btn hoverable">SHOP NOW</div>{" "}
        </div>
      </div>

      <div className="sponsors">
        <img src={require("../assets/sponsors/1.png")} alt="" />
        <img src={require("../assets/sponsors/2.png")} alt="" />
        <img src={require("../assets/sponsors/3.png")} alt="" />
      </div>
      <div className="testimonial">
        <div className="title">Testimonial</div>
        <div className="quote"></div>
        {/* <div className="carousel">
          <div className="group">
            <div className="text">
              Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Quaerat, aspernatur.
            </div>
            <div className="name">newaz sharif /UI Ux Designer</div>
          </div>
          <div className="group">
            <div className="text">
              Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Quaerat, aspernatur.
            </div>
            <div className="name">newaz sharif /UI Ux Designer</div>
          </div>
          <div className="group">
            <div className="text">
              Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Quaerat, aspernatur.
            </div>
            <div className="name">newaz sharif /UI Ux Designer</div>
          </div>
        </div> */}
        <div className="carousel">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ duration: 500 }}
            grabCursor={true}
            loop={true}
            modules={[Navigation, Autoplay]}
            navigation
          >
            <SwiperSlide>
              <div className="text">
                Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Quaerat, aspernatur.
              </div>
              <div className="name">newaz sharif /UI Ux Designer</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text">
                Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Quaerat, aspernatur.
              </div>
              <div className="name">newaz sharif /UI Ux Designer</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text">
                Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Quaerat, aspernatur.
              </div>
              <div className="name">newaz sharif /UI Ux Designer</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text">
                Lorem ipsum dolor Natus, dolore quod libero Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Quaerat, aspernatur.
              </div>
              <div className="name">newaz sharif /UI Ux Designer</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="insta-feed">
        <div className="title">INSTA FEED</div>
        <div className="text">
          Follow us on instagram{" "}
          <a href="#" className="insta-name">
            @fashion
          </a>
        </div>
        <div className="slider">
          <Swiper
            slidesPerView={3}
            onSlideChange={() => console.log(window.innerWidth)}
            grabCursor={true}
            
            modules={[Navigation]}
            navigation
          >
            <SwiperSlide>
              <img src={require("../assets/insta/1.jpg")} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../assets/insta/5.jpg")} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../assets/insta/2.jpg")} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../assets/insta/3.jpg")} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../assets/insta/4.jpg")} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <Footer />
    </>
  );
}
