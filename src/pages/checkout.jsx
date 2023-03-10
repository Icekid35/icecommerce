import {
  Elements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Title from "../components/title";
import { useEffect, useState } from "react";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Checkout() {
  const [runOnce] = useState(null);

  useEffect(() => {
    document
      .getElementById("checkout-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [runOnce]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <Title link={"SHOP/ CHECKOUT"} name="CHECKOUT" />
      <div className="checkout-page" id="checkout-page">
        <form>
          <PaymentElement />

          <PaymentRequestButtonElement />
        </form>
      </div>
    </Elements>
  );
}
