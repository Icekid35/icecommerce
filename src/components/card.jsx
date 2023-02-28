
import '../styles/card.css'
export default function Card( { name, image, price }) {

  return (
      <>
          <div className="card">
              <div className="card-image">
                  <div className="hot">hot</div>
                  <img src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">
                      <div className="heart"></div>
                      <div className="buy"></div>
                      <div className="preview"></div>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">$ {price}</div>
              </div>
      </div>
      </>
  )
}
export function ListCard( { name, image, price }) {

  return (
      <>
          <div className="list-card">
              <div className="card-image">
                  <div className="hot">hot</div>
                  <img src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">

                      <div className="preview"></div>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">$ {price}</div>
                  <div className="text">Lorem ipsum dolor sit amet, mana consectetur adipisicing elit, sed do eiusmod tempor labore.</div>
                  <div className="bottom">
                      <div className="add-to-cart hoverable">ADD TO CART</div>
                      <div className="heart hoverable"></div>
</div>

              </div>
      </div>
      </>
  )
}
export function TopCard( { name, image, price }) {

  return (
      <>
          <div className="list-card top-card">
              <div className="card-image">
                  <img src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">

                      <div className="preview"></div>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">${price}</div>
                  <div className="bottom">
                      <div className="heart hoverable"></div>
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
                  <img src={require(`../assets/products/${image}.webp`)} alt="" />
                  <div className="action-btns">

                      <div className="preview"></div>
              </div>
              </div>
              <div className="card-text">
                  <div className="card-name">{name}</div>
                  <div className="card-price">${price}</div>
                  <div className="bottom">
                  <div className="number">
                                <span>+</span>
                            <input type="text" min={1} value="04" />
                                <span>-</span>
                            </div>
</div>

              </div>
      </div>
      </>
  )
}


