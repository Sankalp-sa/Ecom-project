import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
  return (
    <div>
      <div className="text-center">
        <div className="list-group" style={{border: "4px solid red", padding: "4px"}}>
          <h4 >Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action list-group-item-danger"
          >
            Orders
          </NavLink>
        </div>
      </div>

    </div>
  )
}
