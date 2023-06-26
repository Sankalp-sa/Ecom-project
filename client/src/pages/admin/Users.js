import React from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/AdminMenu";

export default function Users() {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-2 py-5 px-0 m-0 bg-danger">
          <AdminMenu />
        </div>
          <div className="col-md-10">
            <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
