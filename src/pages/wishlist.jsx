import Title from "../components/title";
import "../styles/cart.css";

function Tbody({ image, name, price, quantity }) {
  return (
    <>
      <tr>
        <td>X</td>
        <td>
          <img src={require(`../assets/products/${image}.webp`)} />
        </td>
        <td>{name}</td>
        <td>${price}</td>
        <td>
          <input type="number" min={1} value={quantity} />
        </td>
        <td>${price * quantity}</td>
      </tr>
    </>
  );
}
export default function Wishlist() {
  return (
    <>
      <Title name={"WISHLIST"} link="HOME / WISHLIST" />
      <div className="cart-page">
        <h1>WISHLIST</h1>
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
            <Tbody image={1} name={"pink guchhi"} price={165.0} quantity={1} />
            <Tbody image={2} name={"pink guchhi"} price={105.0} quantity={2} />
            <Tbody image={3} name={"gold guchhi"} price={265.0} quantity={2} />
            <Tbody image={4} name={"pink gaza"} price={565.0} quantity={5} />
          </tbody>
        </table>
      </div>
    </>
  );
}
