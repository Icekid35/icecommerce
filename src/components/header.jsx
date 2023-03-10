import {
  faCartShopping,
  faContactBook,
  faHeart,
  faHome,
  faIdCard,
  faList,
  faSearch,
  faShop,
  faShoppingBag,
  faStream,
  faTimes,
  faArrowUp,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appName } from "../base";
import { DataContext } from "../controller/state";
import "../styles/header.css";
import CartPopup from "./cart-popup";

export default function Header() {
  const { state, dispatch } = useContext(DataContext);

  const [menuActive, setMenuActive] = useState(false);
  const [scrollAssister, setscrollAssister] = useState(false);
  function scrollAssist(e) {
    if (document.documentElement.scrollTop > 10) {
      setscrollAssister(true);
    } else {
      setscrollAssister(false);
    }
  }
  useEffect(() => {
    document.onscroll = scrollAssist;
    return document.removeEventListener("scroll", scrollAssist);
  });
  const navigate = useNavigate();
  const searchRef = useRef(null);
  function Search(e) {
    navigate(`/shop?search=${searchRef.current?.value?.replace?.(" ", "+")}`);
    searchRef.current.value = "";
  }
  return (
    <>
      {scrollAssister && (
        <div
          className="to-top"
          onClick={() => {
            document.documentElement.scrollTo(
              { x: 0, y: 0 },
              { behaviour: "smooth" }
            );
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      )}
      <div className="header">
        <div className="section1">
          <div className="logo">{appName ?? "ezone"}</div>
          <div className="sec1">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <div className="pages">
              <FontAwesomeIcon icon={faList} /> Pages
              <div className="pages-overlay">
                <Link to="/wishlist">
                  <FontAwesomeIcon icon={faHeart} /> Wishlist
                </Link>
                <Link to="/about">
                  <FontAwesomeIcon icon={faIdCard} /> about
                </Link>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faHeadset} /> contact
                </Link>

                <Link to="/cart">
                  {" "}
                  <FontAwesomeIcon icon={faShoppingBag} />
                  cart
                </Link>
              </div>
            </div>

            <Link to="/shop">
              <FontAwesomeIcon icon={faShop} /> shop
            </Link>
            <Link to="/about">
              <FontAwesomeIcon icon={faIdCard} /> about
            </Link>
            <Link to="/contact">
              <FontAwesomeIcon icon={faHeadset} /> contact
            </Link>
          </div>

          <div className="sec2">
            <div className="cart" data-now={state.user.cart.length}>
              <FontAwesomeIcon icon={faCartShopping} size={"2x"} />
              <CartPopup state={state} dispatch={dispatch} />
            </div>
            <div
              className="menu-icon "
              onClick={() => setMenuActive(!menuActive)}
            >
              <FontAwesomeIcon icon={menuActive ? faTimes : faStream} />
            </div>
          </div>
        </div>
        <div className={`mobile-menu ${menuActive && "active"}`}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <div className="pages">
            <FontAwesomeIcon icon={faList} /> Pages
            <div className="pages-overlay">
              <Link to="/wishlist">
                <FontAwesomeIcon icon={faHeart} /> Wishlist
              </Link>
              <Link to="/about">
                <FontAwesomeIcon icon={faIdCard} /> about
              </Link>
              <Link to="/contact">
                <FontAwesomeIcon icon={faHeadset} /> contact
              </Link>

              <Link to="/cart">
                {" "}
                <FontAwesomeIcon icon={faShoppingBag} />
                cart
              </Link>
            </div>
          </div>

          <Link to="/shop">
            <FontAwesomeIcon icon={faShop} /> shop
          </Link>
          <Link to="/about">
            <FontAwesomeIcon icon={faIdCard} /> about
          </Link>
          <Link to="/contact">
            <FontAwesomeIcon icon={faHeadset} /> contact
          </Link>
        </div>
        <div className="section2">
          <div className="access">
            get access:{" "}
            <Link to="/login" className="login">
              {" "}
              {/* <FontAwesomeIcon icon={faSignIn} /> */}
              LOGIN
            </Link>
            |
            <Link to="/register" className="reg">
              {/* <FontAwesomeIcon icon={faDoorOpen} /> */}
              REG
            </Link>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="i am searching for ..."
              ref={searchRef}
            />
            <FontAwesomeIcon
              onClick={Search}
              icon={faSearch}
              size={"lg"}
            ></FontAwesomeIcon>
          </div>
          <Link to="/wishlist" className="wishlist">
            <FontAwesomeIcon icon={faHeart} size={"lg"} />
            wishlist
          </Link>
        </div>
      </div>
    </>
  );
}
