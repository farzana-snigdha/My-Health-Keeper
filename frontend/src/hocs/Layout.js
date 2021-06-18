import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useLocation } from "react-router-dom";

import queryString from "query-string";

const Layout = ({  children }) => {
 

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default (Layout);
