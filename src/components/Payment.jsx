import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { placeOrder } from "../features/orderSlice";

const Payment = () => {
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const cart = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let result = {};

    if (!form.name) result.name = "Name is required";
    if (!form.address) result.address = "Address is required";
    if (!form.cardNumber) result.cardNumber = "Card number is required";
    if (!form.expiry) result.expiry = "Expiry date is required";
    if (!form.cvv) result.cvv = "CVV is required";

    setError(result);

    if (Object.keys(result).length > 0) return;

    const orderData = {
      items: cart,
      payment: form,
    };

    dispatch(placeOrder(orderData));
    alert("Order Successfully Placed!");
    navigate("/orders");
  };

  return (
    <div
      className={`h-110 ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
        }`}
    >
      <div
        className={`max-w-md mx-auto shadow-lg p-6 rounded-lg ${theme === "dark"
            ? "bg-[#1a1a1a] text-white"
            : "bg-white text-black"
          }`}
      >
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border p-2 mb-1 rounded ${theme === "dark"
                ? "bg-[#333] border-gray-600 text-white"
                : "bg-white border-gray-300"
              }`}
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={`w-full border p-2 mb-1 rounded ${theme === "dark"
                ? "bg-[#333] border-gray-600 text-white"
                : "bg-white border-gray-300"
              }`}
          />
          {error.address && (
            <p className="text-red-500 text-sm">{error.address}</p>
          )}

          <input
            name="cardNumber"
            placeholder="Card Number"
            value={form.cardNumber}
            onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
            className={`w-full border p-2 mb-1 rounded ${theme === "dark"
                ? "bg-[#333] border-gray-600 text-white"
                : "bg-white border-gray-300"
              }`}
          />
          {error.cardNumber && (
            <p className="text-red-500 text-sm">{error.cardNumber}</p>
          )}

          <div className="flex gap-3">
            <input
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className={`w-1/2 border p-2 mb-1 rounded ${theme === "dark"
                  ? "bg-[#333] border-gray-600 text-white"
                  : "bg-white border-gray-300"
                }`}
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              className={`w-1/2 border p-2 mb-1 rounded ${theme === "dark"
                  ? "bg-[#333] border-gray-600 text-white"
                  : "bg-white border-gray-300"
                }`}
            />
          </div>

          {error.expiry && (
            <p className="text-red-500 text-sm">{error.expiry}</p>
          )}
          {error.cvv && <p className="text-red-500 text-sm">{error.cvv}</p>}

          <button
            className="w-full bg-red-500 text-white py-3 rounded-lg mt-3 font-semibold hover:bg-red-600"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
