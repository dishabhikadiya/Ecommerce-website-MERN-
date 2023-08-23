import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import MataData from "../layout/MataData";
import axios from "axios";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TfiMouse } from "react-icons/tfi";
import { BiUser, BiSearchAlt2 } from "react-icons/bi";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
  const [first, setfirst, loading] = useState([]);

  const dataGet = async () => {
    const data = await axios.get("http://localhost:4000/api/v1/products");
    setfirst(data.data.products);
    console.log("asd", data.data.products);
  };

  useEffect(() => {
    // getProducts();
    dataGet();
    // dispatch(getProducts());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MataData title="HOME" />

          <div className="banner">
            <div className="icn">
              <NavLink to="search">
                <BiSearchAlt2 fill="white" className="icnh" />
              </NavLink>
              &nbsp; &nbsp;
              <NavLink to="login">
                <BiUser fill="white" className="icnh" />
              </NavLink>
              &nbsp; &nbsp;
              <NavLink to="cart">
                <AiOutlineShoppingCart fill="white" className="icnh" />
              </NavLink>
            </div>
            <p>welcome to Ecommerce</p>
            <h1>FIND AMEZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
                <TfiMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {first &&
              first?.map((product) => {
                console.log("=======================product", product);
                return <ProductCard product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
