import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <Outlet /> {/* This renders the child routes */}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
