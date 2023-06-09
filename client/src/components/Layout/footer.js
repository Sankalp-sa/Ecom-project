import React from 'react'

import { Link } from "react-router-dom";

export default function footer() {
  return (
    <div id='footer' className="bg-dark text-light p-3">
      <h1 className='text-sm-center fs-5 '>All Right Reserved &copy; Sankalp</h1>
      <p className="text-center fs-5 mt-3">
        <Link to="/about" className="text-decoration-none text-light">About</Link> | <Link to="/contact" className="text-decoration-none text-light ">Contact</Link> | <Link to="/policy" className="text-decoration-none text-light">Policy</Link>
      </p>
    </div>
  )
}
