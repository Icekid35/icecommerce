import { toast } from "react-hot-toast";
import "../styles/card.css";
import { useContext } from "react";
import confetti from "canvas-confetti";
import { color } from "../base";
import { Link } from "react-router-dom";
import { DataContext } from "../controller/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faEye,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function addToCart(product, e) {
  confetti({
    particleCount: 100,
    spread: 10,
    origin: {
      y: e.clientY / window.innerHeight,
      x: e.clientX / window.innerWidth,
    },
    startVelocity: 30,
    shapes: ["star"],
  });
  toast.promise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 500);
    }),
    {
      loading: "Adding to cart",
      success: "Added to cart",
      error: "Error occured",
    }
  );
}
function addToWishlist(product, e) {
  confetti({
    particleCount: 50,
    spread: 10,
    origin: {
      y: e.clientY / window.innerHeight,
      x: e.clientX / window.innerWidth,
    },
    startVelocity: 30,
    shapes: ["circle"],
    colors: [color.primarycolor],
  });
  toast.promise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 500);
    }),
    {
      loading: "Adding to Wishlist",
      success: "Added to Wishlist",
      error: "Error occured",
    }
  );
}

export default function Card({ product, dispatch }) {
  const { images, description, id, creationAt, category, price, title } =
    product;
  function addToCart(product, e) {
    confetti({
      particleCount: 100,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["star"],
    });
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: "add-to-cart", payload: product });
          resolve("done");
        } catch {
          reject("error occured");
        }
      }),
      {
        loading: `Adding ${product.title} to Cart`,
        success: `Added ${product.title} to Cart`,
        error: "Error occured",
      }
    );
  }
  function addToWishlist(product, e) {
    confetti({
      particleCount: 50,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["circle"],
      colors: [color.primarycolor],
    });
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: "add-to-wishlist", payload: product });
          resolve("done");
        } catch {
          reject("error occured");
        }
      }),
      {
        loading: `Adding ${product.title} to Wishlist`,
        success: `Added ${product.title} to Wishlist`,
        error: "Error occured",
      }
    );
  }
  return (
    <div className="card" key={id}>
      <div className="card-image">
        <div className="hot">hot</div>
        <img
          loading="lazy"
          src={
            /* images[0]*/ require(`../assets/products/${
              Math.round(Math.random() * 6) + 1
            }.webp`)
          }
          alt={title}
        />
        <div className="action-btns">
          <div className="heart" onClick={(e) => addToWishlist(product, e)}>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div onClick={(e) => addToCart(product, e)} className="buy">
            <FontAwesomeIcon icon={faCartPlus} />
          </div>
          <Link to={`/products/${id}`}>
            <div className="preview">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </Link>
        </div>
      </div>
      <div className="card-text">
        <div className="card-name">{title}</div>
        <div className="card-price">${price}</div>
      </div>
    </div>
  );
}
export function ListCard({ product, dispatch }) {
  const { images, description, id, creationAt, category, price, title } =
    product;
  function addToCart(product, e) {
    confetti({
      particleCount: 100,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["star"],
    });
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: "add-to-cart", payload: product });
          resolve("done");
        } catch {
          reject("error occured");
        }
      }),
      {
        loading: `Adding ${product.title} to Cart`,
        success: `Added ${product.title} to Cart`,
        error: "Error occured",
      }
    );
  }
  function addToWishlist(product, e) {
    confetti({
      particleCount: 50,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["circle"],
      colors: [color.primarycolor],
    });
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: "add-to-wishlist", payload: product });
          resolve("done");
        } catch {
          reject("error occured");
        }
      }),
      {
        loading: `Adding ${product.title} to Wishlist`,
        success: `Added ${product.title} to Wishlist`,
        error: "Error occured",
      }
    );
  }
  return (
    <div key={id} className="list-card">
      <div className="card-image">
        <div className="hot">hot</div>
        <img
          loading="lazy"
          src={
            /*images[0]*/ require(`../assets/products/${
              Math.round(Math.random() * 6) + 1
            }.webp`)
          }
          alt={title}
        />
        <div className="action-btns">
          <Link to={`/products/${id}`}>
            <div className="preview">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </Link>
        </div>
      </div>
      <div className="card-text">
        <div className="card-name">{title}</div>
        <div className="card-price">${price}</div>
        <div className="text">{description}</div>
        <div className="bottom">
          <div
            onClick={(e) => addToCart(product, e)}
            className="add-to-cart hoverable"
          >
            <FontAwesomeIcon icon={faCartPlus} /> ADD TO CART
          </div>
          <div
            className="heart hoverable"
            onClick={(e) => addToWishlist(product, e)}
          >
            <FontAwesomeIcon icon={faHeart} size={"lg"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export function TopCard({ name, image, price, id = 1 }) {
  return (
    <>
      <div className="list-card top-card">
        <div className="card-image">
          <img
            loading="lazy"
            src={require(`../assets/products/${image}.webp`)}
            alt=""
          />
          <div className="action-btns">
            <Link to={`/products/${id}`}>
              <div className="preview">
                <FontAwesomeIcon icon={faEye} />
              </div>
            </Link>
          </div>
        </div>
        <div className="card-text">
          <div className="card-name">{name}</div>
          <div className="card-price">${price}</div>
          <div className="bottom">
            <div
              className="heart hoverable"
              onClick={(e) => addToWishlist(1, e)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function CartCard({ product }) {
  const { title, price, quantity, images, id } = product;
  const { state, dispatch } = useContext(DataContext);
  function mutate(type) {
    switch (type) {
      case "increase":
        dispatch({ type: "add-to-cart", payload: product });
        break;
      case "decrease":
        dispatch({ type: "decrease-cart", payload: product });
        break;
      case "remove":
        dispatch({ type: "remove-from-cart", payload: product });
        break;

      default:
        break;
    }
  }
  return (
    <div className="list-card top-card cart-card" key={id}>
      <div className="card-image">
        <img
          loading="lazy"
          src={require(`../assets/products/${
            Math.round(Math.random() * 6) + 1
          }.webp`)}
          alt=""
        />
        <div className="action-btns">
          <Link to={`/products/${id}`}>
            <div className="preview">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </Link>
        </div>
      </div>
      <div className="card-text">
        <div className="card-name">{title}</div>
        <div className="card-price">${price}</div>
        <div className="bottom">
          <div className="number">
            <span
              onClick={() => {
                mutate("increase");
              }}
            >
              +
            </span>
            <input type="text" min={1} readOnly value={quantity} />
            <span
              onClick={() => {
                mutate("decrease");
              }}
            >
              -
            </span>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              mutate("remove");
            }}
            color={"red"}
          />
        </div>
      </div>
    </div>
  );
}
