import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddress } from "../features/orderSlice";

const Address = () => {
  const dispatch = useDispatch();

  const address = useSelector((state) => state.orders.address);

  const handleSave = () => {
    if (!address.trim()) {
      alert("Please enter address");
      return;
    }

    dispatch(setAddress(address));
    alert("Address saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Your Delivery Address {address}</h1>

      <textarea
        value={address}
        onChange={(e) => dispatch(setAddress(e.target.value))}
        className="w-full border p-3 rounded h-32"
        placeholder="Enter your address..."
      ></textarea>

      <button
        onClick={handleSave}
        className="mt-4 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
      >
        Save Address
      </button>
    </div>
  );
};

export default Address;
