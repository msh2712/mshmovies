import React from "react";
import { Outlet } from "react-router-dom";
import Header from './../Component/Header';
import Loading from "../Component/Loading";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading/>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
