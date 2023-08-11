import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

import { Badge } from "antd";

import { useCart } from "../../context/cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const categories = useCategory();

  const { cart, setCart } = useCart();

  console.log(categories);

  const navigate = useNavigate();

  function handleLogOut() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-1">
            <GiShoppingBag
              className="mb-2 fw-bold"
              style={{ color: "#ffa000" }}
            />{" "}
            Shop it
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{ gap: "4rem" }}
            >
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/categories">
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map((category) => (
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/categories/${category?.name}`}
                      >
                        {category?.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogOut}
                          to="/"
                          className="dropdown-item"
                          aria-current="page"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item mx-3">
                <Badge
                  count={cart?.length}
                  style={{ margin: "9px 9px", backgroundColor: "#ffa000" }}
                  showZero
                >
                  <NavLink to="/cart" className="nav-link" aria-current="page">
                    <ShoppingCartIcon fontSize="large" />
                  </NavLink>
                </Badge>
              </li>
              <li className="nav-item mx-3">
                <Badge
                  count={cart?.length}
                  style={{ margin: "9px 9px", backgroundColor: "#ffa000" }}
                  showZero
                >
                  <NavLink
                    className="nav-link"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <ShoppingCartIcon fontSize="large" />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        class="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Cart items
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </>
  );
}
