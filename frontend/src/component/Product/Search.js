import React, { Fragment } from "react";
import { useState } from "react";
import "./Search.css";
import MataData from "../layout/MataData";

const Search = ({ history }) => {
  const [keyword, setkayword] = useState("");

  const searchSubmitHendler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MataData title="search" />
      <form className="searchBox" onSubmit={searchSubmitHendler}>
        <input
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setkayword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
};

export default Search;
