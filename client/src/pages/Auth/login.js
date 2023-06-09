import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import axios from "axios";
import toast  from "react-hot-toast";
import {useNavigate , useLocation} from "react-router-dom";
import { useAuth } from '../../context/auth';

export default function ForgotPass() {

    const {auth, setAuth} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();
    
    async function handleLoginSubmit(e) {
        e.preventDefault();
        const user = { email, password };
    
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/login`,
            user
          );
          if(res && res.data.success){
            console.log(res)
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            alert(res.data.message);
            navigate(location.state || "/home");
          }
          else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went worng");
        }
    
        setEmail("");
        setPassword("");
       
    }

  return (
    <Layout title={"Forgot password shop it"}>
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
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div className="mb-3">
            <button
              onClick={() => navigate("/forgot-password")}
              type="submit"
              className="btn btn-danger btn-lg w-100"
            >
              Forgot Password
            </button>
            </div>
            
            <button
              onClick={handleLoginSubmit}
              type="submit"
              className="btn btn-danger btn-lg w-100"
            >
              Submit
            </button>
          </div>
        </form>
      </div> 
    </Layout>
  )
}