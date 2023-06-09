import React, { useState } from "react";
import Layout from "../../components/Layout/layout.js";
import axios from "axios";
import toast  from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password, phone, address, answer };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        user
      );
      if(res && res.data.success){
        console.log(res)
        alert(res.data.message);
        navigate("/login");
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went worng");
    }

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
  };

  return (
    <Layout title={"Register - Shop it"}>
      <div className="register">
        <form style={{width: "500px"}}>
          <div id="regiterDiv">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="phone"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="address"
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                placeholder="What is your favourite sport?"
                required
              />
            </div>
            <button
              onClick={handleRegisterSubmit}
              type="submit"
              className="btn btn-danger btn-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
