import React from "react";

import Layout from "../../components/Layout/layout.js";
import UserMenu from "../../components/Layout/UserMenu.js";
import { useAuth } from "../../context/auth.js";

export default function Dashborad() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-danger text-light" style={{padding: "5% 2%"}}>
            <UserMenu />
          </div>
          <div className="col-md-9" style={{padding: "5% 15%"}}>
            <div className="card" style={{padding: "5% 5%"}}>
              <div className="card-body">
                <h5 className="card-title fs-1 mb-3">User Details</h5>
                <p className="card-text">Name: {auth?.user?.name}</p>
                <p className="card-text">Email: {auth?.user?.email}</p>
                <p className="card-text">Address: {auth?.user?.address}</p>
                <p className="card-text">Phone: {auth?.user?.phone}</p>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
