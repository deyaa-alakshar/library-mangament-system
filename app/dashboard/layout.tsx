import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "swiper/css";
import "swiper/css/pagination";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
