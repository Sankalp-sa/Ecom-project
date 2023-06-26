import React from "react";

import { useSearch } from "../../context/search";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function SearchInput({handleSearch, value}) {

  const { search, setSearch } = useSearch();

  const navigate = useNavigate();

  // const handleSubmint = (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/search-product/${search.keyword}`
  //     );

  //     setSearch({
  //       ...search,
  //       products: data,
  //     });

  //     navigate("/search");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
