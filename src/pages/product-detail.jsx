import Title from "../components/title";
import "../styles/product-detail.css";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../controller/state";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";
import { color } from "../base";

const demoProduct = {
  title: "",
  price: "",
  description: "",
  images: [],
  category: {},
};

export default function ProductDetail() {
  const { state, dispatch } = useContext(DataContext);
  const { id } = useParams();
  let product = state.fake.find((item) => item.id == id);
  const redirect = useNavigate();
  if (!product) {
    product = demoProduct;
  }
  useEffect(() => {
    if (!product.title) {
      redirect("/shop");
    }
  });
  const { title, price, description, images, category } = product;

  const [bigImage, setBigImage] = useState(images[0]);
  useEffect(() => {
    document
      .getElementById("product-detail-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [bigImage]);
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
    <>
      <Title name={"PRODUCT DETAIL"} link={"HOME / PRODUCT DETAIL"} />

      <div className="product-detail" id="product-detail-page">
        <div className="sec1">
          <img
            src={require("../assets/products/1.webp")}
            alt=""
            className="main-img"
          />
          <div>
            {images.map((image) => (
              <img
                onClick={() => setBigImage(image)}
                style={{ filter: image == bigImage ? ["brightness(.6)"] : [] }}
                src={require("../assets/products/2.webp")}
                alt=""
              />
            ))}
            {/* <img src={require("../assets/products/3.webp")} alt="" />
            <img src={require("../assets/products/4.webp")} alt="" />
            <img src={require("../assets/products/5.webp")} alt="" /> */}
          </div>
        </div>
        <div className="sec2">
          <div className="name">{title}</div>
          <div className="price">${price}</div>
          <div className="desc">{description}</div>
          <div className="tools">
            <div className="title">color</div>
            <div className="colors">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="title">size</div>
            <div className="sizes">
              <span>XL</span>
              <span>M</span>
              <span>L</span>
              <span>ML</span>
              <span>LM</span>
            </div>
          </div>

          <div className="action">
            <div className="number">
              <span
                onClick={() => {
                  mutate("increase");
                }}
              >
                +
              </span>
              <input
                type="text"
                min={1}
                readOnly
                value={
                  state.user.cart?.find?.((item) => item.id == id)?.quantity ??
                  1
                }
              />
              <span
                onClick={() => {
                  mutate("decrease");
                }}
              >
                -
              </span>
            </div>
            <div
              className="btn add"
              onClick={(e) => {
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
                      mutate("increase");
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
              }}
            >
              ADD TO CART
            </div>
            <div
              className="heart btn"
              onClick={(e) => addToWishlist(product, e)}
            ></div>
          </div>

          <div className="extra">
            <div className="title">Categories</div>
            <div className="categories">
              <span>{category?.name}</span>
              {/* <span>outdoor</span>
              <span>shorts</span> */}
            </div>
          </div>
          <div className="extra">
            <div className="title">tags</div>
            <div className="categories">
              <span>FASHION</span>
              <span>outdoor</span>
              <span>shorts</span>
            </div>
          </div>
          <div className="extra">
            <div className="title">socials</div>
            <div className="categories">
              <a href="" className="social-btn"></a>
              <a href="" className="social-btn"></a>
              <a href="" className="social-btn"></a>
              <a href="" className="social-btn"></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
