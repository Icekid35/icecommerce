import { appName } from "../base";
import { DataContext } from "../controller/state";
import "../styles/footer.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const { state, dispatch } = useContext(DataContext);
  const { fake } = state;
  const [categories, _] = useState(
    new Array(
      ...new Set(fake.slice().map((product) => product.category.name))
    ).sort()
  );

  return (
    <>
      <footer>
        <div className="grid">
          <div className="title">Customer service</div>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/account">my account</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/contact">support</Link>
            </li>
            {/* <li>
              <a href="void()">track</a>
            </li> */}
          </ul>
        </div>
        <div className="grid">
          <div className="title">Categories</div>

          <ul>
            {categories.map((category, id) => (
              <li key={category}>
                <Link to={`/shop?category=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
          {/* <ul>
            <li>
              <a href="void()">dress</a>
            </li>
            <li>
              <a href="void()">shoes</a>
            </li>
            <li>
              <a href="void()">shirt</a>
            </li>
            <li>
              <a href="void()">baby product</a>
            </li>
            <li>
              <a href="void()">mans product</a>
            </li>
            <li>
              <a href="void()">leather</a>
            </li>
          </ul> */}
        </div>
        <div className="grid">
          <div className="title">
            CONTACT <FontAwesomeIcon icon={faHeadset} />
          </div>
          <div className="text">
            {" "}
            alias placeat consequatur. A, natus voluptates! Esse amet, magnam
            quibusdam praesentium fugit quas?
          </div>

          <ul>
            <li>
              <div className="searchbar">
                <input type="text" placeholder="Your Email" />
                <span className="action">
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </li>
            <li>77 Seventh avenue USA 12555.</li>
            <li>+88 (015) 609735 or +88 (012) 112266</li>
          </ul>
        </div>
      </footer>
      <div className="copywrite">
        Copyright © {appName} 2022 . All Right Reserved.
      </div>
    </>
  );
}
