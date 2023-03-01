import React, { useState, useEffect } from "react";
import Card, { ListCard, TopCard } from "../components/card";
import CardHolder, { ListCardHolder } from "../components/cardHolder";
import Title from "../components/title";
import "../styles/shop.css";
import fake from "../assets/fake.json";

const productsPerPage = 30;
export default function Shop() {
  const [products, setProducts] = useState(fake.slice());
  const [data, setData] = useState([...products].splice(0, productsPerPage));
  const [batch, setBatch] = useState(0);
  const categories = new Array(
    ...new Set(products.map((product) => product.category.name))
  ).sort();
  function nextBatch() {
    const productsCopy = products.slice();
    const maxBatch = Math.round(products.length / productsPerPage);
    if (batch >= maxBatch - 1) return;
    const next =
      batch == maxBatch
        ? (products.length - 1) - ((batch + 1) * productsPerPage)
        : productsPerPage;

    setData(productsCopy.splice((batch + 1) * productsPerPage, next));
    setBatch(batch + 1);
  }

  function prevBatch() {
    const productsCopy = products.slice();

    if (batch <= 0) return;
    setBatch(batch - 1);
    const next = productsPerPage;
    setData([...productsCopy.splice(batch * productsPerPage, next)]);
  }
  function customBatch(num) {
    const productsCopy = products.slice();

    const maxBatch = Math.round(products.length / productsPerPage);
    if (num > maxBatch - 1 || num < 0) return;
    setBatch(num);

    const next =
      num == maxBatch
        ? (products.length - 1) - ((num) * productsPerPage)
        : productsPerPage;

    setData(productsCopy.splice((num) * productsPerPage, next));
  }

  const [sortType, setSortType] = useState("default");
  function reSort(e) {
    const choice = e.target.value;
    let newArray=[]
    switch (choice) {
      case "default":
        newArray=fake.slice()
        break;

      case "price-desc":
        newArray=([...products.sort((a, b) => b.price - a.price)]);
        break;
      case "price-asc":
        newArray=([...products.sort((a, b) => a.price - b.price)]);
        break;
      case "newest":
        newArray=([
          ...products.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
              return -1;
            }
            if (a.updatedAt > b.updatedAt) {
              return 1;
            }
            return 0;
          }),
        ]);
        break;
      case "a-z":
        newArray=([
          ...products.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }),
        ]);
        break;

      default:
        newArray=([...fake.slice()]);

        break;
  
        

    }
    
    setProducts(newArray)
    setBatch(0);
    const productsCopy = newArray.slice();
    setData([...productsCopy.splice(0, productsPerPage)]);
  }
  const [listMode, setListMode] = useState(false);
  function changeMode(MODE) {
    setListMode(MODE == "list" ? true : false);
  }

  useEffect(() => {
    document
      .getElementById("shop-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return (
    <>
      <Title />
      <div className="shop" id="shop-page">
        <div className="tools">
          <div className="title">Search products</div>
          <div className="searchbar">
            <input type="text" placeholder="Search products" />
            <span className="action"></span>
          </div>
          <div className="title">Filter By Price</div>

          <div className="range">
            <div className="slider"></div>
            <div className="text">
              <div>
                Price : <span>$20</span> - <span>$100</span>
              </div>
              <div>Filter</div>
            </div>
          </div>

          <div className="title">Categories</div>
          <div className="categories">
            {categories.map((category, index) => {
              return (
                <div className="category" key={index}>
                  <span>{category}</span>{" "}
                  <span>
                    {
                      products.filter(
                        (product) => product.category.name == category
                      ).length
                    }
                  </span>
                </div>
              );
            })}
            {/* <div className="category">
              <span>book</span> <span>3</span>
            </div>
            <div className="category">
              <span>Clothing</span> <span>5</span>
            </div>
            <div className="category">
              <span>Homelife</span> <span>4</span>
            </div>
            <div className="category">
              <span>Kids & baby</span> <span>10</span>
            </div> */}
          </div>
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
          <div className="title">Most bought products</div>
          <div className="top-products">
            <TopCard name={"flying drone"} image={1} price={140.0} />
            <TopCard name={"flying drone"} image={1} price={140.0} />
            <TopCard name={"flying drone"} image={1} price={140.0} />
          </div>
        </div>
        <div>
          <div className="shop-top-section">
            <div className="sec1">
              <div>
                <span>{data.length}</span> products found of{" "}
                <span>{products.length}</span>
              </div>
              <div className="sort">
                sort by{" "}
                <select name="" id="" onChange={reSort}>
                  <option value="default">Default</option>
                  <option value="a-z">A-Z</option>
                  <option value="newest">Newest</option>
                  <option value="price-desc">Price Desc</option>
                  <option value="price-asc">Price Asc</option>
                </select>
              </div>
            </div>

            <div className="choice">
              <div className="box-mode" onClick={() => changeMode("box")}></div>
              <div
                className="List-mode"
                onClick={() => changeMode("list")}
              ></div>
            </div>
          </div>
          <>
            {listMode ? (
              <ListCardHolder>
                {data.map((product) => (
                  <ListCard product={product} />
                ))}
                {/* <ListCard name={"navyn bird print"} image={1} price={115.0} />
                <ListCard name={"navyn bird print"} image={2} price={115.0} />
                <ListCard name={"navyn bird print"} image={3} price={115.0} />
                <ListCard name={"navyn bird print"} image={4} price={115.0} />
                <ListCard name={"navyn bird print"} image={5} price={115.0} />
                <ListCard name={"navyn bird print"} image={6} price={115.0} />
                <ListCard name={"navyn bird print"} image={7} price={115.0} /> */}
              </ListCardHolder>
            ) : (
              <CardHolder>
                {data.map((product) => (
                  <Card product={product} />
                ))}
                {/* <Card name={"navyn bird print"} image={2} price={115.0} />
                <Card name={"navyn bird print"} image={3} price={115.0} />
                <Card name={"navyn bird print"} image={4} price={115.0} />
                <Card name={"navyn bird print"} image={5} price={115.0} />
                <Card name={"navyn bird print"} image={6} price={115.0} />
                <Card name={"navyn bird print"} image={7} price={115.0} />
                <Card name={"navyn bird print"} image={8} price={115.0} /> */}
              </CardHolder>
            )}

            <div className="shop-nav">
              <div h className="prev" onClick={prevBatch}>
                &lt;
              </div>
              {batch >0 && <div onClick={() => customBatch(batch- 1)}>{batch }</div>}
              <div className="present">{batch + 1}</div>
              {batch < products.length / productsPerPage - 1 && <div onClick={() => customBatch(batch + 1)}>{batch + 2}</div>}
              {batch < products.length / productsPerPage - 1 && <div>...</div>}
             {batch < products.length / productsPerPage - 1 &&  <div
                onClick={() =>
                  customBatch(Math.round(products.length / productsPerPage - 1))
                }
              >
                {Math.round(products.length / productsPerPage)}
              </div>}
              <div className="next" onClick={nextBatch}>
                &gt;
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
