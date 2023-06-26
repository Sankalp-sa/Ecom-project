import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 className="text-light">Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Create catagory
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Create product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}
