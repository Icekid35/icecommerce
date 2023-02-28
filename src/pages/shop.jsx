import React, { useState } from "react";
import Card, { ListCard, TopCard } from "../components/card";
import CardHolder, { ListCardHolder } from "../components/cardHolder";
import Title from "../components/title";
import "../styles/shop.css";

export default function Shop() {
  const [listMode, setListMode] = useState(false);
  function changeMode(MODE) {
    setListMode(MODE == "list" ? true : false);
  }
  return (
    <>
      <Title />
      <div className="shop">
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
            <div className="category">
              <span>Accessories</span> <span>4</span>
            </div>
            <div className="category">
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
            </div>
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
                <span>23</span> products found of <span>50</span>
              </div>
              <div className="sort">
                sort by{" "}
                <select name="" id="">
                  <option value="Default">Default</option>
                  <option value="a-z">A-Z</option>
                  <option value="newest">Newest</option>
                  <option value="Top">Top</option>
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
                <ListCard name={"navyn bird print"} image={1} price={115.0} />
                <ListCard name={"navyn bird print"} image={2} price={115.0} />
                <ListCard name={"navyn bird print"} image={3} price={115.0} />
                <ListCard name={"navyn bird print"} image={4} price={115.0} />
                <ListCard name={"navyn bird print"} image={5} price={115.0} />
                <ListCard name={"navyn bird print"} image={6} price={115.0} />
                <ListCard name={"navyn bird print"} image={7} price={115.0} />
                <ListCard name={"navyn bird print"} image={8} price={115.0} />
              </ListCardHolder>
            ) : (
              <CardHolder>
                <Card name={"navyn bird print"} image={1} price={115.0} />
                <Card name={"navyn bird print"} image={2} price={115.0} />
                <Card name={"navyn bird print"} image={3} price={115.0} />
                <Card name={"navyn bird print"} image={4} price={115.0} />
                <Card name={"navyn bird print"} image={5} price={115.0} />
                <Card name={"navyn bird print"} image={6} price={115.0} />
                <Card name={"navyn bird print"} image={7} price={115.0} />
                <Card name={"navyn bird print"} image={8} price={115.0} />
              </CardHolder>
            )}

            <div className="shop-nav">
              <a href="#" className="prev">
                &lt;
              </a>
              <a href="# ">1</a>
              <a href="#">2</a>
              <a href="#">...</a>
              <a href="#">19</a>
              <a href="#" className="next">
                &gt;
              </a>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
