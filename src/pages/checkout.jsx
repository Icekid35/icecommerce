
import { Elements, PaymentElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Title from '../components/title'
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Checkout() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
  return (
    <Elements stripe={stripePromise} options={options}>
          <Title link={"SHOP/ CHECKOUT"} name="CHECKOUT"/>
      <div className="checkout-page">
      <form>
      <PaymentElement />
  
          <PaymentRequestButtonElement />
    </form>
          </div>
      </Elements>
  )
}
