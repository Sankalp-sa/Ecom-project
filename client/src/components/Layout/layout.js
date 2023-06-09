import React from "react";
import Header from "./Header";
import Footer from "./footer";
import { Helmet } from "react-helmet";

import { Toaster } from 'react-hot-toast';


export default function layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
}

layout.defaultProps = {
  title: "Welcome to Shop it",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
  author: "Shop it"
};
