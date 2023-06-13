import React from "react";

import Layout from "../../components/Layout/layout.js";
import UserMenu from "../../components/Layout/UserMenu.js";
import { useAuth } from "../../context/auth.js";

export default function Dashborad() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Details</h5>
                <p className="card-text">Name: {auth?.user?.name}</p>
                <p className="card-text">Email: {auth?.user?.email}</p>
                <p className="card-text">Address: {auth?.user?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
