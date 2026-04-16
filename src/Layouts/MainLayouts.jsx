import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;