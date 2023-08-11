import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/order`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div
            className="col-md-2 bg-danger text-light"
            style={{ padding: "5% 2%" }}
          >
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Orders</h1>
            <div className="border shadow">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Order No.</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{order.status}</td>
                      <td>{order.buyer.name}</td>
                      <td>{moment(order.createAt).fromNow()}</td>
                      <td>{order.payment.success ? "Success" : "Failed"}</td>
                      <td>{order.products.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="container-fluid">
                {orders.map((o) => (
                  o.products.map((item) => (
                  <div key={item._id} className="col-md-12 mb-3">
                    <div className="card" style={{ maxWidth: 800 }}>
                      <div className="row g-0">
                        <div className="col-4 border border-light-subtle">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${item._id}`}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">
                              {item.description.substring(0, 100)}...
                            </p>
                            <p className="fs-1 mb-3">${item.price}</p>
                            <button className="btn btn-dark me-3">
                              More Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
