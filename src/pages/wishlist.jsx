import Title from "../components/title";
import "../styles/cart.css";
import {useEffect} from 'react'

function TbodyW({ image, name, price, quantity }) {
  return (
    <>
      <tr>
        <td>X</td>
        <td>
          <img src={require(`../assets/products/${image}.webp`)} />
        </td>
        <td>{name}</td>
        <td>${price}</td>

      </tr>
    </>
  );
}
export default function Wishlist() {
  useEffect(() => {
    document
      .getElementById("wishlist-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
  return (
    <>
      <Title name={"WISHLIST"} link="HOME / WISHLIST" />
      <div className="cart-page" id='wishlist-page'>
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
            <TbodyW image={1} name={"pink guchhi"} price={165.0}  />
            <TbodyW image={2} name={"pink guchhi"} price={105.0}  />
            <TbodyW image={3} name={"gold guchhi"} price={265.0}  />
            <TbodyW image={4} name={"pink gaza"} price={565.0}  />
          </tbody>
        </table>
      </div>
    </>
  );
}
