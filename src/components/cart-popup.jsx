import "../styles/cart-popup.css";
import { CartCard } from "./card";

export default function CartPopup({state,dispatch}) {

  return (
    <>
      {state.cart.length < 1 ? (
        <></>
      ) : (
        <div className="cart-popup">
          <div className="title">Your Cart</div>
          <div className="cards-band">
            {state.cart.map((product) => (
              <CartCard product={product} />
            ))}
            {/* <CartCard image={2} name="test" price={300}/>
            <CartCard image={3} name="test" price={300}/>
            <CartCard image={4} name="test" price={300}/>
            <CartCard image={1} name="test" price={300}/>
            <CartCard image={2} name="test" price={300}/>
            <CartCard image={3} name="test" price={300}/>
            <CartCard image={4} name="test" price={300}/> */}
          </div>
          <div className="action-btns">
            <div
              className="empty-cart"
              onClick={() => {
                dispatch({ type: "empty-cart" });
              }}
            >
              Empty cart
            </div>
            <div className="checkout">Check out</div>
          </div>
        </div>
      )}
    </>
  );
}
