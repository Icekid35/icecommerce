import React, { useState, useEffect, useRef, useContext } from "react";
import Card, { ListCard, TopCard } from "../components/card";
import CardHolder, { ListCardHolder } from "../components/cardHolder";
import Title from "../components/title";
import "../styles/shop.css";
// import fake from "../assets/fake.json";
import { DataContext } from "../controller/state";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faSearch,
  faTh,
  faThLarge,
  faThList,
} from "@fortawesome/free-solid-svg-icons";

const productsPerPage = 30;

export default function Shop() {
  const { state, dispatch } = useContext(DataContext);
  const { fake } = state;

  // Products state and displayProducts state will be used in pagination.
  const [products, setProducts] = useState(fake.slice());
  const [displayProducts, setDisplayProducts] = useState(fake.slice());

  // The initial data slice for pagination
  const [data, setData] = useState(products.slice().splice(0, productsPerPage));

  // The current batch
  const [batch, setBatch] = useState(0);

  // The search term
  const [searchTerm, setSearchTerm] = useState("");

  // The currently active category
  const [activeCategory, setActiveCategory] = useState("all");

  // The list of unique categories in the products data
  const [categories, _] = useState(
    new Array(
      ...new Set(fake.slice().map((product) => product.category.name))
    ).sort()
  );

  // The search bar reference
  const searchRef = useRef(null);

  // The URL search params
  const [query, setQueries] = useSearchParams();

  // Set the search query param when the search term is updated
  useEffect(() => {
    if (searchTerm.length >= 1) {
      setQueries({ search: searchTerm });
    }
  }, [searchTerm]);

  // Update the search term when the URL search param changes
  useEffect(() => {
    if (query.get("search") && query.get("search") !== searchTerm) {
      setSearchTerm(query.get("search"));
    }
  }, []);

  // Search for products when the search button is clicked
  function Search() {
    setSearchTerm(searchRef.current.value);
  }

  // Filter products by category when a category is clicked
  function switchCategory(choice, e) {
    let catChoice;
    switch (choice) {
      case "all":
        catChoice = fake.slice();
        setProducts(catChoice);
        customBatch(0, catChoice);
        setActiveCategory("all");
        break;

      default:
        if (!choice in categories) {
          return;
        }
        catChoice = fake
          .slice()
          .filter((product) => product.category.name === choice);
        setProducts(catChoice);
        customBatch(0, catChoice);
        setActiveCategory(choice);
        break;
    }
  }

  // Go to the next page of products
  function nextBatch() {
    const productsCopy = displayProducts.slice();
    const maxBatch = Math.round(displayProducts.length / productsPerPage + 0.5);

    if (batch >= maxBatch - 1) return;

    const next =
      batch == maxBatch
        ? displayProducts.length - 1 - (batch + 1) * productsPerPage
        : productsPerPage;

    setData(productsCopy.splice((batch + 1) * productsPerPage, next));
    setBatch(batch + 1);
  }

  // Go to the previous page of products
  function prevBatch() {
    const productsCopy = displayProducts.slice();

    if (batch <= 0) return;
    setBatch(batch - 1);
    const next = productsPerPage;
    setData([...productsCopy.splice(batch * productsPerPage, next)]);
  }
  function customBatch(num, newP) {
    const productsCopy = newP?.slice?.() ?? displayProducts.slice();

    const maxBatch =
      displayProducts.length < productsPerPage
        ? displayProducts.length
        : Math.round(displayProducts.length / productsPerPage + 0.5);
    if (num > maxBatch - 1 || num < 0) return ;
    setBatch(num);

    const next =
      num == maxBatch
        ? displayProducts.length - 1 - num * productsPerPage
        : productsPerPage;

    setData(productsCopy.splice(num * productsPerPage, next));
  }

  const [sortType, setSortType] = useState("default");
  function reSort(e, newP) {
    const choice = e?.target?.value || sortType;
    let newArray = [];
    let reProducts = newP || displayProducts;
    switch (choice) {
      case "default":
        newArray = reProducts.slice();
        break;

      case "price-desc":
        newArray = [...reProducts.sort((a, b) => b.price - a.price)];
        break;
      case "price-asc":
        newArray = [...reProducts.sort((a, b) => a.price - b.price)];
        break;
      case "newest":
        newArray = [
          ...reProducts.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
              return -1;
            }
            if (a.updatedAt > b.updatedAt) {
              return 1;
            }
            return 0;
          }),
        ];
        break;
      case "a-z":
        newArray = [
          ...reProducts.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }),
        ];
        break;

      default:
        newArray = [...reProducts.slice()];

        break;
    }
    setSortType(choice);
    if (newP) {
      setDisplayProducts(newArray);
    } else {
      setDisplayProducts(newArray);
      setProducts(newArray);
    }
    customBatch(0, newArray);
    // setBatch(0);
    // const productsCopy = newArray.slice();
    // setData([...productsCopy.splice(0, productsPerPage)]);
  }
  const [listMode, setListMode] = useState(false);
  function changeMode(MODE) {
    setListMode(MODE == "list" ? true : false);
  }

  useEffect(() => {});
  const [priceRange, setPriceRange] = useState(1);
  useEffect(() => {
    const newP = products
      .slice()
      .filter((product) => Number(product.price) >= Number(priceRange))
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    // setProducts(newP)
    // switchCategory(activeCategory)
    reSort(undefined, newP);
    document
      .getElementById("shop-page")
      .scrollIntoView({ behavior: "smooth", block: "start" });
    return () => {};
  }, [priceRange, activeCategory, searchTerm]);
  return (
    <>
      <Title />
      <div className="shop" id="shop-page">
        <div className="tools">
          <div className="title">Search products</div>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search products"
              ref={searchRef}
              value={searchTerm}
              onChange={Search}
            />
            <span className="action" onClick={Search}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <div className="title">Filter By Price</div>

          <div className="range">
            <input
              type="range"
              min={1}
              max={1000}
              defaultValue={1}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
              className="slider"
            ></input>
            <div className="text">
              <div>
                Price : <span>${priceRange}</span> - <span>$1000</span>
              </div>
              <div>Filter</div>
            </div>
          </div>

          <div className="title">Categories</div>
          <div className="categories">
            <div
              className={`category  ${
                activeCategory == "all" ? "is-active" : ""
              }`}
              onClick={(e) => switchCategory("all", e)}
            >
              <span>All</span> <span>{fake.length}</span>
            </div>
            {categories.map((category, index) => {
              return (
                <div
                  className={`category  ${
                    activeCategory == category ? "is-active" : ""
                  }`}
                  key={index}
                  onClick={(e) => switchCategory(category, e)}
                >
                  <span>{category}</span>{" "}
                  <span>
                    {
                      fake
                        .slice()
                        .filter((product) => product.category.name == category)
                        .length
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
                <span>{displayProducts.length}</span>
              </div>
              <div className="sort">
                sort by{" "}
                <select name="" id="" onChange={reSort} defaultValue={sortType}>
                  <option value="default">Default</option>
                  <option value="a-z">A-Z</option>
                  <option value="newest">Newest</option>
                  <option value="price-desc">Price Desc</option>
                  <option value="price-asc">Price Asc</option>
                </select>
              </div>
            </div>

            <div className="choice">
              <FontAwesomeIcon
                className="box-mode"
                size={"lg"}
                icon={faThLarge}
                onClick={() => changeMode("box")}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="List-mode"
                onClick={() => changeMode("list")}
                icon={faList}
                size={"lg"}
              ></FontAwesomeIcon>
            </div>
          </div>
          <>
            {listMode ? (
              <ListCardHolder>
                {data.map((product) => (
                  <ListCard product={product} dispatch={dispatch} />
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
                  <Card product={product} dispatch={dispatch} />
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
              {batch > 0 && (
                <div onClick={() => customBatch(batch - 1)}>{batch}</div>
              )}
              <div className="present">{batch + 1}</div>
              {batch < displayProducts.length / productsPerPage - 1 && (
                <div onClick={() => customBatch(batch + 1)}>{batch + 2}</div>
              )}
              {batch <= displayProducts.length / productsPerPage - 3 && (
                <div>...</div>
              )}
              {batch <= displayProducts.length / productsPerPage - 2 && (
                <div
                  onClick={() =>
                    customBatch(
                      Math.round(displayProducts.length / productsPerPage - 1)
                    )
                  }
                >
                  {Math.round(displayProducts.length / productsPerPage)}
                </div>
              )}
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
