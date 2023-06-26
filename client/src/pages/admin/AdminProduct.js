import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-all-products`
      );
      console.log(res.data);
      if (res.status === 200) {
        setProducts(res.data.products);
      } else {
        console.log("Error in fetching products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 py-5 px-0 m-0 bg-danger">
            <AdminMenu />
          </div>
          <div className="col-md-10 text-center" style={{ padding: "5% 17%" }}>
            <h1>All products list</h1>
            {/* create cards for showing products */}
            <div className="row">
            {products?.map((product) => (
              <Link 
              to={`/dashboard/admin/product/${product.slug}`}
              key={product._id}
              className="text-decoration-none col-md-4 d-flex justify-content-center"
              >
              <div className="card m-3" style={{ width: "18rem" }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 100)}
                  </p>
                </div>
              </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
