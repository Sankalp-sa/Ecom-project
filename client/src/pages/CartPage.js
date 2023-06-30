import React from "react";
import Layout from "../components/Layout/layout";
import { useCart } from "../context/cart";

export default function CartPage() {
  const { cart, setCart } = useCart();

  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }

  const removeCartItem = (id) => {
    try {
      const newCart = cart.filter((item) => item._id !== id);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
