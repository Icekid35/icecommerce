import Title from "../components/title";
import "../styles/product-detail.css";
import {useEffect,useContext} from 'react'
import { useParams, } from "react-router-dom";
import { DataContext } from "../controller/state";

export default function ProductDetail() {
  const { state, dispatch } = useContext(DataContext)
  useEffect(() => {
    document
    .getElementById("product-detail-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const {id} = useParams()
  const product = state.fake.find((item) => item.id == id)
  console.log(state.fake.find((item) => item.id == id), product)
  
const {title,price,description,images}=product
  return (
    <>
      <Title name={"PRODUCT DETAIL"} link={"HOME / PRODUCT DETAIL"} />

      <div className="product-detail" id='product-detail-page'>
        <div className="sec1">
          <img
            src={require("../assets/products/1.webp")}
            alt=""
            className="main-img"
          />
          <div>
            {images.map(image => (
              
            <img src={require("../assets/products/2.webp")} alt="" />
            ))}
            {/* <img src={require("../assets/products/3.webp")} alt="" />
            <img src={require("../assets/products/4.webp")} alt="" />
            <img src={require("../assets/products/5.webp")} alt="" /> */}
          </div>
        </div>
        <div className="sec2">
          <div className="name">{title}</div>
          <div className="price">${price}</div>
          <div className="desc">
           {description}
          </div>
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
              <span>+</span>
              <input type="text" min={1} value="04" />
              <span>-</span>
            </div>
            <div className="btn add">ADD TO CART</div>
            <div className="heart btn"></div>
          </div>

          <div className="extra">
            <div className="title">Categories</div>
            <div className="categories">
              <span>mens</span>
              <span>outdoor</span>
              <span>shorts</span>
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
