import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices.js";
import SearchInput from "../components/Forms/SearchInput.js";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";

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

  // cart state
  const { cart, setCart } = useCart();

  const max = 1000000;

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
  }, [page, checked, products.priceRange, products.search]);

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
    }, 200);
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
    <div>
      <div className="row bg-warning text-white landing-text" >
        <div
          className="col-md-2 border-end border-light-subtle "
          style={{ padding: "5% 2%" }}
        >
          {/* Category filter */}
          <h4 className="text-center mb-3">Filters By Category</h4>
          <div className="d-flex flex-column ms-3 ps-4">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                className="pb-2 text-white"
                onChange={(e) =>
                  handleFilterByCategory(e.target.checked, category._id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* Price fitler */}
          <h4 className="text-center my-3 ps-3 pt-5  ">Filters By Price</h4>
          <div className="d-flex flex-column ms-3 ps-4">
            <Radio.Group onChange={(e) => handleFilterByPrice(e.target.value)}>
              <div key={0}>
                <Radio value={0} className="mb-2 text-white">
                  All
                </Radio>
              </div>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mb-2 text-white">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3 p-3">
            <button
              className="btn btn-outline-dark btn-sm"
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
                className="text-decoration-none col-lg-4 d-flex justify-content-center py-5"
              >
                <div className="card" style={{width: "20rem"}}>
                  <div className="card-img-div" >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                    className="card-img-top shadow"
                    alt="..."
                  />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 30)}...
                    </p>
                    <p className="fs-1 mb-2">${product.price}</p>
                    <p className="card-text">{product.category.name}</p>
                    <div className="d-flex align-items-start justify-content-start gap-3 py-3">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${product.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          if (cart.find((p) => p._id === product._id) === undefined) {
                            setCart([...cart, product]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, product])
                            );
                            toast.success(`${product.name} added to cart`);
                          } else {
                            toast.error(`${product.name} already in cart`);
                          }
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <center>
              <button
                className="btn btn-dark btn-lg rounded-0 fs-3 rounded-start-4 fw-bold px-4"
                disabled={page <= 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page - 1);
                }}
              >
                &lt;
              </button>
              <button
                className="btn btn-dark btn-lg rounded-0 fs-3 rounded-end-4 fw-bold px-4"
                disabled={page + 1 > Math.ceil(total / 3)}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                &gt;
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
