import React from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer"; // Ensure Footer is correctly imported

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    
    </>
  );
};

export default Layout;
