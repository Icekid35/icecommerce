
import { toast } from 'react-hot-toast'
import '../styles/card.css'
import confetti from 'canvas-confetti'
import {color} from '../base'
import { Link } from 'react-router-dom';


function addToCart(product, e) {

    confetti({
        particleCount: 100,
        spread: 10,
        origin: { y: e.clientY / window.innerHeight, x: e.clientX / window.innerWidth },
        startVelocity: 30,
        shapes: ['star'],
      });
    toast.promise(
         new Promise((resolve, reject) => {
              setTimeout(()=>{resolve('done')},500)  
            })
        , {
            loading:"Adding to cart",
            success:"Added to cart",
           error:"Error occured",
       }
   )
}
function addToWishlist(product, e) {
    confetti({
        particleCount: 50,
        spread: 10,
        origin: { y: e.clientY / window.innerHeight, x: e.clientX / window.innerWidth },
        startVelocity: 30,
        shapes: ['circle'],
        colors:[color.primarycolor],
      });
    toast.promise(
         new Promise((resolve, reject) => {
              setTimeout(()=>{resolve('done')},500)  
            })
        , {
            loading:"Adding to Wishlist",
            success:"Added to Wishlist",
           error:"Error occured",
       }
   )
}

export default function Card( {product }) {
    const {images,description,id, creationAt,category,price,title}=product
  return (
      
          <div className="card" key={id}>
              <div className="card-image">
                  <div className="hot">hot</div>
                  <img loading='lazy' src={/*image[0]*/require(`../assets/products/${Math.round(Math.random() *6)+1 }.webp`)} alt={title} />
                  <div className="action-btns">
                      <div className="heart" onClick={(e)=>addToWishlist(product,e)}></div>
                      <div onClick={(e)=>addToCart(product,e)} className="buy"></div>
                  <Link to="/products/1">
                      
                  <div className="preview"></div>
                     </Link>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{title}</div>
                  <div className="card-price">${price}</div>
              </div>
      </div>
      
  )
}
export function ListCard( { product}) {
    const {images,description,id, creationAt,category,price,title}=product

  return (
      
      <div key={id } className="list-card">
              <div className="card-image">
                  <div className="hot">hot</div>
                  <img loading='lazy' src={/*images[0]*/ require(`../assets/products/${Math.round(Math.random()*6)+ 1 }.webp`)} alt={title} />
                  <div className="action-btns">
                  <Link to="/products/1">
                      
                      <div className="preview"></div>
                         </Link>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{title}</div>
                  <div className="card-price">${price}</div>
                  <div className="text">{description}</div>
                  <div className="bottom">
                      <div onClick={(e)=>addToCart(product,e)} className="add-to-cart hoverable">ADD TO CART</div>
                      <div className="heart hoverable" onClick={(e)=>addToWishlist(product,e)}></div>
</div>

              </div>
      </div>
      
  )
}
export function TopCard( { name, image, price }) {

  return (
      <>
          <div className="list-card top-card">
              <div className="card-image">
                  <img loading='lazy' src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">
                  <Link to="/products/1">
                      
                      <div className="preview"></div>
                         </Link>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">${price}</div>
                  <div className="bottom">
                      <div className="heart hoverable" onClick={(e)=>addToWishlist(1,e)}></div>
</div>

              </div>
      </div>
      </>
  )
}
export function CartCard( { name, image, price }) {

  return (
      <>
          <div className="list-card top-card cart-card">
              <div className="card-image">
                  <img loading='lazy' src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">
                  <Link to="/products/1">
                      <div className="preview"></div>
                         </Link>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">${price}</div>
                  <div className="bottom">
                  <div className="number">
                                <span>+</span>
                            <input type="text" min={1} defaultValue="04" />
                                <span>-</span>
                            </div>
</div>

              </div>
      </div>
      </>
  )
}


