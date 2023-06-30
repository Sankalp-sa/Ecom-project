import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      setName(auth?.user?.name);
      setEmail(auth?.user?.email);
      setPhone(auth?.user?.phone);
      setAddress(auth?.user?.address);
    }
  }, [auth?.user]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const {data} = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
      { name, email, password, phone, address }
    );

      if(data.success){
        setAuth({...auth, user: data.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
      else{
        toast.error(data.message);
      }

  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2 bg-danger text-light"
            style={{ padding: "5% 2%" }}
          >
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <form style={{ width: "500px" }}>
                <div id="regiterDiv">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="phone"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="address"
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      placeholder="Address"
                    />
                  </div>
                  <button
                    onClick={handleUpdateSubmit}
                    type="submit"
                    className="btn btn-danger"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
