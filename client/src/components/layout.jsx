import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <nav>nav</nav>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
