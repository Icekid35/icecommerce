import { toast } from "react-hot-toast";
import processPayment from "./processPayment";





async function handleCheckout(resolve = () => { }, reject = () => { },state,setStatus) {
    try {
      
      
      // var handler = PaystackPop.setup({
      //   key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
      //   email: state.user.email,
      //   amount:state.user.cart.reduce((total, item) => item.price * item.quantity + total, 0) * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
      //   currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
      //   callback: function(response) {
      //     //this happens after the payment is completed successfully
      //     var reference = response.reference;
      //     alert('Payment complete! Reference: ' + reference);
      //     console.log(response)
      //     setStatus(false)
      //     resolve('processed')
      //     // Make an AJAX call to your server with the reference to verify the transaction
      //   },
      //   onClose: function() {
      //     alert('Transaction was not completed, window closed.');
      //     setStatus(false)
      //     return reject('an unexpected error occored');
      //   },
        
      // });
      // handler.openIframe();





    //   if (response.ok == false) {
        
    //   setStatus(false)
    //   return reject('an unexpected error occored');
    //   }
    //  const data=await response.json()
    //   console.log(data)
    //   setStatus(false)
    //   resolve('processed')
    //   toast.loading('redirecting...')
    } catch (e) {
      console.log(e,'rejecting')
      setStatus(false)
    return  reject(e)
    }
  }


export default function proceedToCheckout(state={user:{}},navigate=()=>{}){

  if(!state.user.name) return navigate('/login')

      return navigate('/checkout')
  }
// export 