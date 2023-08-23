import React, { Fragment, useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";
import MataData from "../layout/MataData";

const categories = [
  "leptop",
  "footwear",
  "bottom",
  "tops",
  "Attire",
  "camera",
  "smartPhones",
];
const Products = ({ match }) => {
  const keyword = match.params.keyword;
  const [Products, setfirst] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [protductCount, resultPerPage, count] = useState([]);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState([]);
  const [ratings, setRatings] = useState(0);

  const dataGet = async (
    keyword = "",
    currentPage = 1,
    price = "",
    category = "",
    ratings = ""
  ) => {
    let addquery = "";
    if (keyword) {
      addquery = addquery + "keyword=" + keyword + "&";
    }
    if (currentPage) {
      addquery = addquery + "page=" + 1 + "&";
    }
    if (price) {
      addquery =
        addquery + "price[gte]=" + +price[0] + "&price[lt]=" + +price[1] + "&";
    }
    if (category.length > 0) {
      console.log("cate -- ", category);
      addquery = addquery + "category=" + category + "&";
    }
    if (ratings) {
      addquery = addquery + "ratings[gte]=" + +ratings;
    }
    let query;
    if (addquery) {
      query = `http://localhost:4000/api/v1/products?${addquery}`;
    } else {
      query = `http://localhost:4000/api/v1/products`;
    }
    const data = await axios.get(query);
    // console.log("i am hare", data.data.products[0]._id);

    setfirst(data.data.products);
  };
  const priceHendler = (event, newPrice) => {
    console.log("==========cvbnm", newPrice);
    setPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    console.log("e", e);
    setCurrentPage(e);
  };

  useEffect(() => {
    console.log("home");
    dataGet(keyword, currentPage, price, category, ratings);
  }, [keyword, currentPage, price, category, ratings]);
  return (
    <Fragment>
      <MataData title="PRODUCT" />
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {console.log("test", Products)}

        {Products &&
          Products.map((product) => {
            console.log("]]]]]]]]]]]]]]]]", product);
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
      {keyword && (
        <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHendler}
            valueLabelDisplay="on"
            aria-labelledby="range-slider"
            min={0}
            max={30000}
          />
          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <fieldset>
            <Typography>Reting Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="on"
              min={0}
              max={5}
            />
          </fieldset>
        </div>
      )}
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={protductCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
