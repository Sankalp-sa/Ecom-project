import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DiscountProduct() {
  const [productsInGroupOfThree, setProductsInGroupOfThree] = useState([]);

  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const getProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/discount-products`
    );
    const discountProduct = res.data.discountProduct;

    let p3 = [];

    for (let index = 0; index < discountProduct.length; index = index + 3) {
      p3.push(discountProduct.slice(index, index + 3));
    }

    console.log(p3);

    setProductsInGroupOfThree(p3);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-theme="dark">
        <div className="carousel-inner">
          {productsInGroupOfThree.map((product, index) => {
            return (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="row" style={{padding: "3% 10%"}}>
                  {product.map((p) => {
                    return (
                      <Link
                        to={`/`}
                        key={p.product._id}
                        className="text-decoration-none col-lg-4 d-flex justify-content-center py-5"
                      >
                        <div className="card" style={{ width: "20rem", color: "white" }}>
                          <div className="card-img-div">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p.product._id}`}
                              className="card-img-top shadow"
                              alt="..."
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{p.product.name}</h5>
                            <p className="card-text">
                              {p?.product?.description?.substring(0, 30)}...
                            </p>
                              <p className="fs-1 mb-2">${p.discount} <span className="text-decoration-line-through fs-5 text-danger">${p.product.price}</span></p>
                            
                            <p className="card-text">
                              {p.product.category.name}
                            </p>
                            <div className="d-flex align-items-start justify-content-start gap-3 py-3">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/product/${p.product.slug}`);
                                }}
                              >
                                More Details
                              </button>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  if (
                                    cart.find((pe) => pe._id === p.product._id) ===
                                    undefined
                                  ) {   
                                    setCart([...cart, p.product]);
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify([...cart, p.product])
                                    );
                                    toast.success(
                                      `${p.product.name} added to cart`
                                    );
                                  } else {
                                    toast.error(
                                      `${p.product.name} already in cart`
                                    );
                                  }
                                }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
