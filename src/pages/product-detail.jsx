import Title from "../components/title";
import "../styles/product-detail.css";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../controller/state";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";
import { color } from "../base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as EmptyImage} from '../assets/illustrations/No data-rafiki.svg'
import '../styles/svg.css'
import Seo from "../components/seo";
const demoProduct = {
  title: "",
  price: "",
  description: "",
  images: [],
  category: {},
};


export default function ProductDetail() {
  const { state, dispatch } = useContext(DataContext);
  const [selectedColor,setSelectedColor]=useState(null)
  const [selectedSize,setSelectedSize]=useState(null)
 
  const { id } = useParams();
  let product = state.shopProducts.find((item) => item.id == id);
  const redirect = useNavigate();
  if (!product) {
    product = demoProduct;
  }
  // useEffect(() => {
  //   if (!product.title) {
  //     redirect("/shop");
  //   }
  // });
  const { title, price, description, images, category,colors=['red','black','white','blue','green','yellow'] } = product;

  const [bigImage, setBigImage] = useState(images[0]);
  useEffect(() => {
    document
      ?.getElementById("product-detail-page")
      ?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [bigImage]);
  function mutate(type) {
    switch (type) {
      case "increase":
        dispatch({ type: "add-to-cart", payload: product,color:selectedColor,size:selectedSize });
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
      <Seo title={title+ ' Detail'} />
      
      <Title name={"PRODUCT DETAIL"} link={"HOME / PRODUCT DETAIL"} />

    {title=='' ?  <div className="svg-wrapper" id="product-detail-page">
              <EmptyImage />
      </div>
        : <div className="product-detail" id="product-detail-page">
        <div className="sec1">
          <img
            src={bigImage}
            alt=""
            className="main-img"
          />
          <div>
            {images.map((image) => (
              <img
                onClick={() => setBigImage(image)}
                style={{ filter: image == bigImage ? ["brightness(.6)"] : [] }}
                src={image}
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
          <div className="price"><FontAwesomeIcon icon={faNairaSign} />{price}</div>
          <div className="desc">{description}</div>
          <div className="tools">
            <div className="title">color</div>
            <div className="colors">
{
                colors.map(color => {
    return(
      <span title={color} style={{backgroundColor:color,border:selectedColor!=color ? '1px solid var(--neutral-color)' : '1px solid var(--text-color)'}} onClick={()=>setSelectedColor(color)}></span>
    )
  })
}            </div>
            <div className="title">size</div>
            <div className="sizes">
              <span style={{backgroundColor:'XL' !=selectedSize ?'': 'var(--neutral-color)'}}  title='extra large' onClick={()=>{setSelectedSize('XL')}}>XL</span>
              <span style={{backgroundColor:'M' !=selectedSize ?'': 'var(--neutral-color)'}} title='medium' onClick={()=>{setSelectedSize('M')}}>M</span>
              <span style={{backgroundColor:'L' !=selectedSize ?'': 'var(--neutral-color)'}} title='large' onClick={()=>{setSelectedSize('L')}}>L</span>
              <span style={{backgroundColor:'ML' !=selectedSize ?'': 'var(--neutral-color)'}} title='ML' onClick={()=>{setSelectedSize('ML')}}>ML</span>
              <span style={{backgroundColor:'LM' !=selectedSize ?'': 'var(--neutral-color)'}} title='LM' onClick={()=>{setSelectedSize('LM')}}>LM</span>
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
              className="btn add hoverable"
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
              <FontAwesomeIcon icon={faCartPlus} />
              ADD TO CART
             
            </div>
            <div
              className="heart btn hoverable"
              onClick={(e) =>{
                if (state.user.wishlist?.find?.((item) => item.id == id)) return;
                
                addToWishlist(product, e)
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>

          <div className="extra">
            <div className="title">Categories</div>
            <div className="categories">
              <span>{category?.name}</span>
              {/* <span>outdoor</span>
              <span>shorts</span> */}
            </div>
          </div>

        </div>
      </div>}
    </>
  );
}
