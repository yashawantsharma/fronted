import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode)
  return (
    <footer className={`border-1 text-center p-10 ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}>
      © 2025 FoodExpress | All rights reserved
    </footer>
  );
};

export default Footer;
