import React from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminDasboard() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Admin Details</h5>
                <p className="card-text">Name: {auth?.user?.name}</p>
                <p className="card-text">Email: {auth?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
