import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout.js";
import { useAuth } from "../context/auth.js";
import axios from "axios";
import { Link , useNavigate}  from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices.js";
import SearchInput from "../components/Forms/SearchInput.js";

let timeoutId = null;

export default function HomePage() {
  const { auth } = useAuth();

  const [products, setProducts] = useState({
    priceRange: [],
    productsArr: [],
    search: "",
  });

  const navigate = useNavigate();

  // Category filter state
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // get Total cnt of products
  const getTotal = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );

      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  // londmore pages

  const loadMore = async () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,
          { checked, radio: products.priceRange, keyword: products.search }
        );

        setProducts({ ...products, productsArr: res.data.products });
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, checked, products.priceRange, products.search]);

  //handle filter by price
  const handleFilterByPrice = (value) => {
    if (value !== 0) {
      setProducts({ ...products, priceRange: value });
    } else {
      const max = Math.max(...products.productsArr.map((p) => p.price));
      setProducts({ ...products, priceRange: [0, max] });
    }
  };

  //handle filter by category
  const handleFilterByCategory = (value, categoryId) => {
    let all = [...checked];

    if (value) {
      all.push(categoryId);
    } else {
      all = all.filter((c) => c !== categoryId);
    }

    setChecked(all);
  };

  // get Filtered products

  const getFilteredProducts = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio: products.priceRange }
      );

      setProducts({ ...products, productsArr: res.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories
  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );

      setCategories(res.data.categories);
      console.log(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  //get all products
  const getProducts = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,
        { checked, radio: products.priceRange }
      );

      console.log(res.data.products);

      setProducts({ ...products, productsArr: res.data.products });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // handle search
  const handleSearch = async (keyword) => {
    setProducts({ ...products, search: keyword });
  };

  return (
    <Layout title={"All Products - Best offer"}>
      <div className="row">
        <div className="col-md-2" style={{ padding: "2% 2%" }}>
          {/* Category filter */}
          <h4 className="text-center">Filters By Category</h4>
          <div className="d-flex flex-column ms-3">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                className="pb-2"
                onChange={(e) =>
                  handleFilterByCategory(e.target.checked, category._id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* Price fitler */}
          <h4 className="text-center">Filters By Price</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e) => handleFilterByPrice(e.target.value)}>
              <div key={0}>
                <Radio value={0}>All</Radio>
              </div>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3 p-3">
            <button
              className="btn btn-dark btn-sm"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10" style={{ padding: "5% 10%" }}>
          <h1>All products list</h1>
          <SearchInput handleSearch={handleSearch} value={products.search} />
          {/* create cards for showing products */}
          <div className="row">
            {products?.productsArr?.map((product) => (
              <Link
                to={`/`}
                key={product._id}
                className="text-decoration-none col-md-4 d-flex justify-content-center"
              >
                <div className="shadow card m-3 " style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                    className="card-img-top shadow"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text">{product.category.name}</p>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button 
                        className="btn btn-dark btn-sm" 
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${product.slug}`)
                        }}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div>
              <button
                className="btn btn-dark"
                disabled={page <= 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page - 1);
                }}
              >
                Prev
              </button>
              <button
                className=" btn btn-secondary"
                disabled={page + 1 > Math.ceil(total / 6)}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
