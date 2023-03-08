import Title from "../components/title";
import {useEffect,useContext} from 'react'
import "../styles/cart.css";
import { Link } from "react-router-dom";
import { DataContext } from "../controller/state";

function Tbody({ product, dispatch }) {
  const { image, title,id, price, quantity }=product
  return (
    <>
      <tr>
        <td onClick={()=>dispatch({type:'remove-from-cart',payload:product})}>X</td>
        <td>
        <Link to={`/product/${id}`}>

<img src={/*images[0] */ require(`../assets/products/${1}.webp`)} />
</Link>

</td>
<td>
<Link to={`/product/${id}`}>

{title}
</Link></td>
        <td>${price}</td>
        <td>
          <input type="number" min={1} onChange={(e)=>dispatch({type:'custom-cart-quantity',payload:product,quantity:e.target.value})} value={quantity} />
        </td>
        <td>${price * quantity}</td>
      </tr>
    </>
  );
}
export default function Cart() {
  const {state,dispatch}=useContext(DataContext)

  useEffect(() => { 
    document
      .getElementById("cart-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
  return (
    <>
      <Title name={"CART"} link="HOME / CART" />
      {state.cart.length < 1 ? <div id='cart-page'>
        <h1>
        Your Cart is Empty</h1>  
      </div> : <form className="cart-page" id="cart-page">
        <h1>CART</h1>
        <table>
          <thead>
            <tr>
              <th>remove</th>
              <th>images</th>
              <th>product</th>
              <th>price</th>
              <th>quantity</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {state.cart.map(product => (
              
            <Tbody product={product} dispatch={dispatch} />
            ))}
            {/* <Tbody image={2} name={"pink guchhi"} price={105.0} quantity={2} />
            <Tbody image={3} name={"gold guchhi"} price={265.0} quantity={2} />
            <Tbody image={4} name={"pink gaza"} price={565.0} quantity={5} /> */}
          </tbody>
        </table>

        <div className="update-coupon">
          <div className="sec1">
            <input type="text" placeholder="Coupon code" />
            <div className="btn apply">apply coupon</div>
          </div>
          <div className="sec2">
            <div className="btn update">update cart</div>
          </div>
        </div>
        <div className="cart-totals-holder">
          <div className="cart-totals">
            <div className="h2">Cart Totals</div>
            <div>
              <div className="total">
                <span>Subtotal</span>
                <span>100.00</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>100.00</span>
              </div>
            </div>
            <div className="btn proceed">Proceed To Checkout</div>
          </div>
        </div>
      </form>}
    </>
  );
}
