import { faCartArrowDown, faCross, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/cart-popup.css";
import { CartCard } from "./card";

export default function CartPopup({ state, dispatch }) {
  return (
    <>
      {state.user.cart.length < 1 ? (
        <></>
      ) : (
        <div className="cart-popup">
            <div className="title">Your Cart</div>
          <div className="cards-band">
            {state.user.cart.map((product) => (
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
              <FontAwesomeIcon icon={faTrash} size={"lg"} />
            </div>
            <div className="checkout">
              Check out
              <FontAwesomeIcon icon={faCartArrowDown} size={"lg"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
