import React from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminDasboard() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 py-5 px-0 m-0 bg-danger">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75" style={{padding: "7% 15%"}}> 
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
