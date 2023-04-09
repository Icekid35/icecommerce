import Title from "../components/title";
import { useEffect, useContext, useState, useRef } from "react";
import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../controller/state";
import {
  faCartArrowDown,
  faMoneyBill1Wave,
  faNairaSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proceedToCheckout from "../controller/proceed-to-checkout";
import Seo from "../components/seo";
import { toast } from "react-hot-toast";

function Tbody({ product, dispatch }) {
  const { images, title, id, price, quantity,colors=[],sizes=[] } = product;
  return (
    <>
      <tr>
        <td
          onClick={() =>
            dispatch({ type: "remove-from-cart", payload: product })
          }
        >
          X
        </td>
        <td>
          <Link to={`/products/${id}`}>
            <img src={images[0] } />
          </Link>
        </td>
        <td>
          <Link to={`/products/${id}`}>{title}</Link>
        </td>
        <td><FontAwesomeIcon icon={faNairaSign} />{price}</td>
        <td>
          <input
            type="number"
            min={1}
            onChange={(e) =>
              dispatch({
                type: "custom-cart-quantity",
                payload: product,
                quantity: e.target.value,
              })
            }
            value={quantity}
          />
 
        </td>
        <td>{Array(...new Set(colors)).slice().join(', ')}</td>
        <td>{Array(...new Set(sizes)).join(', ')}</td>
       <td><FontAwesomeIcon icon={faNairaSign} />{price * quantity}</td>
      </tr>
    </>
  );
}
export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const [runOnce] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    document
      .getElementById("cart-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [runOnce]);
  const sumCart = (arr) => arr.reduce((total, item) => item.price * item.quantity + total, 0);
  const cartTotal = sumCart(state.user.cart);

  const [off,setOff]=useState(0)
  const couponRef=useRef(null)
  const applyCoupon =async (resolve,reject) => {
    const { value } = couponRef.current
    if (value.trim() == '') {
      toast('please input a coupon')
      return reject('error')
    }
    // const featcher = await fetch('/verify-coupon', {
    //   method: 'POST',
    //   body: JSON.stringify({coupon : value.trim()}),
    //   headers: { 'content-type': 'application/json' }
    // })

    // if (!featcher.ok) {
    //   toast.error("an unexpected error occured ")
    //   reject()
    //   return
    // }
    // const result = await featcher.json()
    // couponRef.current.value = ''
    // console.log(result);
    // if (result.error) {
    //   toast.error(result.error)
    //   reject()
    //   return
    // }
    // if (result.off) {
    //   setOff(result.off)
    //   toast.success('coupon applied sucessfully')
    // }
    toast('Coupons are not currently availiable')
    resolve('sucess')

  }
  return (
    <>
      <Seo title='your cart' />
      
      <Title name={"CART"} link="HOME / CART" />
      {state.user.cart.length < 1 ? (
        <div id="cart-page">
          <h1>Your Cart is Empty</h1>
        </div>
      ) : (
        <form className="cart-page" id="cart-page">
          <h1>CART</h1>
          <table>
            <thead>
              <tr>
                <th>remove</th>
                <th>images</th>
                <th>product</th>
                <th>price</th>
                <th>quantity</th>
                <th>colors</th>
                <th>sizes</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {state.user.cart.map((product) => (
                <Tbody product={product} dispatch={dispatch} />
              ))}
              {/* <Tbody image={2} name={"pink guchhi"} price={105.0} quantity={2} />
            <Tbody image={3} name={"gold guchhi"} price={265.0} quantity={2} />
            <Tbody image={4} name={"pink gaza"} price={565.0} quantity={5} /> */}
            </tbody>
          </table>

          <div className="update-coupon">
            <div className="sec1">
                <input type="text" placeholder="Coupon code" ref={couponRef } />
              <div className="btn apply" onClick={()=>{
                  toast.promise(new Promise(applyCoupon), {
                    loading: 'applying coupon',
                    success:"coupon applied",
                    error:"something went wrong"
                })
              }}>
                apply coupon
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
              </div>
            </div>
            <div className="sec2">
              <div className="btn update">update cart</div>
            </div>
          </div>
          <div className="cart-totals-holder" >
            <div className="cart-totals">
              <div className="h2">Cart Totals</div>
              <div>
                <div className="total">
                  <span>Subtotal</span>
                  <span><FontAwesomeIcon icon={faNairaSign} />{cartTotal}</span>
                </div>
                <div className="total">
                  <span>Coupon</span>
                  <span>{off}% off</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span><FontAwesomeIcon icon={faNairaSign} />{Math.round(cartTotal - (cartTotal * (off/100)))}</span>
                </div>
              </div>
              <div id="checkout" className="btn proceed" onClick={()=>proceedToCheckout(state,navigate)}>
                Proceed To Checkout
                <FontAwesomeIcon icon={faCartArrowDown} />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
