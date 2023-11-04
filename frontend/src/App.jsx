import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />

      <Toaster />
    </div>
  );
};

export default App;
