import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { PaystackButton } from "react-paystack";

import Seo from "../components/seo";
import Title from "../components/title";

import "../styles/checkout.css";
import { DataContext } from "../controller/state";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Checkout(props) {
  const [runOnce] = useState(null);
  const { state, dispatch } = useContext(DataContext);
  const proceed = useLocation();
  const [checkoutStatus, setCheckoutStatus] = useState(false);
  const [paystackProps, setPaystackProps] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document
      .getElementById("checkout-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [runOnce]);
  function handleSubmit(e) {
    e.preventDefault();
    //fields
    let {
      country,
      address1,
      address2,
      name,
      city,
      state: c_state,
      zip,
      phone,
    } = e.target;
    country = country.value;
    address1 = address1.value;
    address2 = address2.value;
    name = name.value;
    city = city.value;
    c_state = c_state.value;
    zip = zip.value;
    phone = phone.value;
    setPaystackProps({
      publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
      email: state.user.email,
      phone,
      firstName: state.user.given_name,
      lastName: state.user.family_name,
      amount:
        state.user.cart.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        ) * 100,
      currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars

      onSuccess: function (response) {
        //this happens after the payment is completed successfully
        var reference = response.reference;
        toast.success("Payment complete! Reference: " + reference);
        navigate("/thank-you");
        console.log(response);
        setCheckoutStatus(false);
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function () {
        toast.error("Transaction was not completed,someting went wrong.");
        setCheckoutStatus(false);
      },
      metadata: {
        custom_fields: [
          {
            display_name: "Cart Items",
            variable_name: "cart_items",
            value: state.user.cart.reduce(
              (total, item) => item.quantity + " " + item.title + " , " + total,
              ""
            ),
          },
          {
            display_name: "Cart Items Details ",
            variable_name: "cart_items_details",
            value: state.user.cart
              .map(({ title, price, id, sizes, colors }) =>
                JSON.stringify({ title, price, id, sizes, colors })
              )
              .join("  ~~~   "),
          },
        ],
      },
    });
    if (proceed?.c_state?.proceed) {
    }
    dispatch({
      type: "login",
      payload: {
        country,
        address1,
        address2,
        city,
        state: c_state,
        zip,
        phone,
      },
    });
    console.log(1);
   
    document.querySelector(".paystack-button").click();
    // pay({ ...state, user: { ...state.user,  country, address1, address2, city, state : c_state, zip, phone }},checkoutStatus,setCheckoutStatus)
  }
  return (
    <>
      <Seo title="checkout" />

      <Title link={"SHOP/ CHECKOUT"} name="CHECKOUT" />
      <div className="checkout-page" id="checkout-page">
        <h1>Shipping Address</h1>
        <div className="text">add a new shipping address</div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-holder">
              <label htmlFor="country">Country</label>
              <input
                defaultValue={state.user.country}
                required
                type="text"
                name="country"
                id="country"
                placeholder="e.g Nigeria"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-holder">
              <label htmlFor="name">Full Name</label>
              <input
                defaultValue={state.user.name}
                required
                type="text"
                name="name"
                id="name"
                placeholder="First and last name"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-holder">
              <label htmlFor="address1">Address Line 1</label>
              <input
                defaultValue={state.user.address1}
                required
                type="text"
                name="address1"
                id="address1"
                placeholder="Street adress,company name, c/o"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-holder">
              <label htmlFor="address2">Address Line 2</label>
              <input
                defaultValue={state.user.address2}
                required
                type="text"
                name="address2"
                id="address2"
                placeholder="Apartment, Suite, unit, building, floor, etc."
              />
            </div>
          </div>
          <div className="row">
            <div className="input-holder">
              <label htmlFor="city">City</label>
              <input
                defaultValue={state.user.city}
                required
                type="text"
                name="city"
                id="city"
                placeholder="eg Gwagwalada"
              />
            </div>
            <div className="input-holder">
              <label htmlFor="state">state</label>
              <input
                defaultValue={state.user.state}
                required
                type="text"
                name="state"
                id="state"
                placeholder="eg Lagos"
              />
            </div>
            <div className="input-holder">
              <label htmlFor="zip">zip</label>
              <input
                defaultValue={state.user.zip}
                required
                type="text"
                name="zip"
                id="zip"
                placeholder="eg 910101"
              />
            </div>
          </div>
          <div className="row ">
            <div className="input-holder">
              <label htmlFor="phone">Phone number</label>
              <input
                defaultValue={state.user.phone}
                required
                type="tel"
                name="phone"
                id="phone"
                placeholder="incase we have to contact you"
              />
            </div>
          </div>

          <button disabled={checkoutStatus} type="submit">
            CONTINUE
          </button>
          <PaystackButton
            text="Pay"
            {...paystackProps}
            className="paystack-button"
          ></PaystackButton>
        </form>
      </div>
    </>
  );
}
