import Title from "../components/title";
import "../styles/cart.css";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../controller/state";
import { Link } from "react-router-dom";
import Seo from "../components/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";

function TbodyW({ dispatch, product }) {
  const { images, title, price, id ,} = product;
  return (
    <>
      <tr>
        <td
          onClick={() =>
            dispatch({ type: "remove-from-wishlist", payload: product })
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
      </tr>
    </>
  );
}
export default function Wishlist() {
  const { state, dispatch } = useContext(DataContext);
  const [runOnce] = useState(null);

  useEffect(() => {
    document
      .getElementById("wishlist-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [runOnce]);
  return (
    <>
      <Seo title='wishlist' />
      
      <Title name={"WISHLIST"} link="HOME / WISHLIST" />
      <div className="cart-page" id="wishlist-page">
        <h1>WISHLIST</h1>
        <table>
          <thead>
            <tr>
              <th>remove</th>
              <th>images</th>
              <th>product</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {state.user.wishlist?.length < 1 ? (
              <h1>YOUR WISHLIST IS EMPTY</h1>
            ) : (
              state.user?.wishlist?.map?.((product) => (
                <TbodyW product={product} dispatch={dispatch} />
              ))
            )}
            {/* <TbodyW image={2} name={"pink guchhi"} price={105.0}  />
            <TbodyW image={3} name={"gold guchhi"} price={265.0}  />
            <TbodyW image={4} name={"pink gaza"} price={565.0}  /> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
