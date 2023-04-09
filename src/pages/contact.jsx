
import '../styles/contact-us.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Seo from '../components/seo';
import Title from '../components/title';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.target;
        const data = new FormData(form);
    
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (response.ok) {
         toast.success('Thank you for your message!');
          form.reset();
        } else {
         toast.error('Something went wrong. Please try again.');
        }
    };
    const [runOnce]=useState(null)
      useEffect(() => {
        document
          .getElementById("contact-page")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }, [runOnce]);
    
      return (
        <>
              <Seo title='contact ' />
          
          <Title name={'contact  us'} link='HOME /contact ' />
    <section className="contact-us" id='contact-page' >
      <div className="container">
        <h2>Contact Us</h2>
        <p>
          Have a question or need help with your order? We're here to assist you! You can reach us through any of the following channels:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> <a href="mailto:info@ecommercestore.com">info@ecommercestore.com</a>
          </li>
          <li>
            <strong>Phone:</strong>+234-815-789-9361
          </li>
          <li>
            <strong>Live Chat:</strong> Available during business hours (9am-5pm EST)
          </li>
        </ul>
        <p>
          You can also fill out the form below and we'll get back to you as soon as possible. Thank you for choosing us as your go-to ecommerce store, and we look forward to hearing from you!
                      </p>
             
      <form action="https://formspree.io/f/mgebpvpv" method="POST" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"  value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"  value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formData.message} rows="5" onChange={handleChange} required></textarea>
                              
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
              </section>
              </>
  );
};

export default ContactUs;




