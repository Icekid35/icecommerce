import Title from "../components/title";
import "../styles/product-detail.css";

export default function ProductDetail() {
  return (
    <>
      <Title name={"PRODUCT DETAIL"} link={"HOME / PRODUCT DETAIL"} />

      <div className="product-detail">
        <div className="sec1">
          <img
            src={require("../assets/products/1.webp")}
            alt=""
            className="main-img"
          />
          <div>
            <img src={require("../assets/products/2.webp")} alt="" />
            <img src={require("../assets/products/3.webp")} alt="" />
            <img src={require("../assets/products/4.webp")} alt="" />
            <img src={require("../assets/products/5.webp")} alt="" />
          </div>
        </div>
        <div className="sec2">
          <div className="name">pretty pink blouse</div>
          <div className="price">$120.00</div>
          <div className="desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam neque
            quis excepturi, natus perspiciatis tenetur blanditiis, modi porro
            inventore aut quia omnis enim magnam eius reiciendis voluptatum
            minima assumenda provident?
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
