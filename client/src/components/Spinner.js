import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Spinner() {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && navigate("/login",{
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count, navigate, location]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <h1 className="text-center">Redirecting you in {count} sec</h1>
  <div className="spinner-border mx-3" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>


  );
}

