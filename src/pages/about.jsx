import { useEffect, useState } from 'react';
import Seo from '../components/seo';
import Title from '../components/title';
import '../styles/about.css'

const AboutMe = () => {
     const [runOnce]=useState(null)
      useEffect(() => {
        document
          .getElementById("about-page")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }, [runOnce]);
    return (
      <>
            <Seo title='About' />
      
      <Title name={'About us'} link='HOME /About' />
    <section className="about-me" id="about-page" >
      <div className="container">
        <h2>About Us</h2>
        <p>
          Welcome to our ecommerce store! We're a team of passionate individuals who love to bring you the latest and greatest products from around the world. Our goal is to provide you with a seamless shopping experience and make sure you find exactly what you're looking for.
        </p>
        <p>
          We specialize in a wide range of products, from electronics and gadgets to home goods and beauty supplies. We pride ourselves on offering high-quality products at affordable prices, so you don't have to break the bank to get what you need.
        </p>
        <p>
          If you have any questions or concerns, please don't hesitate to reach out to us. We're always here to help and provide you with the best customer service possible. Thank you for choosing us as your go-to ecommerce store, and happy shopping!
        </p>
      </div>
    </section>
      </>
  );
};

export default AboutMe;
