import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // get payment gateway token :

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      console.log("data of braintree token api" + data.clientToken);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // handle payment
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      console.log(data);

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  const removeCartItem = (id) => {
    try {
      const newCart = cart.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-9 p-3 py-5">
            <h1 className="mb-5">Cart Items</h1>
            <h3 className="mb-4">Total items in cart {cart.length}</h3>
            <div className="row">
              {cart?.map((item) => (
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
                          <button
                            className="btn btn-danger"
                            onClick={() => removeCartItem(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 p-3 py-5 text-center text-light bg-danger">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : ${totalPrice()}</h4>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="mb-3 py-3">
                  <h4>Current Address :</h4>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate("/dashboard/user/address")}
                  >
                    Add Address{" "}
                  </button>
                ) : (
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <hr />
            <div>
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-dark"
                    onClick={handlePayment}
                  >
                    {loading ? "Loading..." : "Pay Now"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
