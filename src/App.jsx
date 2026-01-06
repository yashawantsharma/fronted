import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Payment from "./components/Payment";
import Sidebar from "./components/Sidebar";
import Orders from "./components/Orders";
import Address from "./components/Address";
import LikedItems from "./components/LikedItems";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";


const App = () => {
  const isOpen = useSelector((s) => s.sidebar.isOpen);
  return (
    <BrowserRouter>

       
      <Sidebar />

      <div className="min-h-screen transition-all">

        <Header/>
        <Chat/>
        <Routes>
          <Route
            path="/" element={<Home/>}/>

          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/cart" element={<Cart />} />
            <Route path="/chat" element={<Chat />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/liked" element={<LikedItems />} />
        </Routes>

        <Footer />
        {/* </div> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
