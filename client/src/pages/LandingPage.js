import React from "react";
import Layout from "../components/Layout/layout";
import HomePage from "./HomePage";
import DiscountProduct from "./DiscountProduct";

export default function LandingPage() {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6" style={{ padding: "8% 6.3%" }}>
          <h1 className="title vertical-center text-wrap">
            Shop it and Live it
          </h1>
          <p className="text-warp landing-text fs-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            velit, iste nemo sed repudiandae pariatur error dolorum, aperiam
            similique voluptate cum nihil. Pariatur, modi nemo?
          </p>
          <a className="btn btn-warning" href="#shop">Shop</a>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ padding: "2% 4%" }} >
          <img src="/Images/landingPage.jpg" className=" img-fluid" alt="..." />
        </div>
      </div>
      <div>
        <h1 className="title text-white bg-warning text-center mb-0 py-5 border border-bottom" id="shop">Today's Best Deals for you</h1>
        <HomePage />
      </div>
      <div>
        <h1 className="title text-center mb-0 py-5 border border-bottom">Get the best Offers here</h1>
        <DiscountProduct />
      </div>
    </Layout>
  );
}
