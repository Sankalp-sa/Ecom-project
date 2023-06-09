import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import axios from "axios";
import toast  from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function Login() {

const [email, setEmail] = useState("");
const [answer, setAnswer] = useState("");
const [newPassword, setNewPassword] = useState("");

const navigate = useNavigate();

async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {email, answer, newPassword}
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
   
}

  return (
    <Layout>
        <div className="register">
        <form style={{width: "500px"}}>
          <div id="regiterDiv">
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Enter your favourite sport 
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                required
              />
            </div>
            
            <button
              onClick={handleLoginSubmit}
              type="submit"
              className="btn btn-danger btn-lg w-100"
            >
              Reset
            </button>
          </div>
        </form>
      </div> 
    </Layout>
  )
}

