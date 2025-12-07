import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddress } from "../features/orderSlice";

const Address = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const savedAddress = useSelector((state) => state.order.address);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    house: "",
    street: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.pincode || !form.house || !form.street || !form.city || !form.state) {
      alert("Please fill all required fields");
      return;
    }
    dispatch(setAddress(form));
    alert("Address saved successfully!");
  };

  return (
    <div className={` mx-auto p-6 rounded-xl shadow ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}>
      <h2 className="text-2xl text-center font-bold mb-6">Add Delivery Address</h2>

      <form className="flex w-full items-center flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col">
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Pincode / ZIP</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="110001"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">House / Apartment No.</label>
          <input
            type="text"
            name="house"
            value={form.house}
            onChange={handleChange}
            placeholder="123, Block A"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Delhi"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Delhi"
            className={`p-3 w-100 rounded border focus:outline-none focus:ring-2 ${theme === "dark"
              ? "bg-[#222] border-gray-600 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 text-black focus:ring-blue-500"
              }`}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-red-500 text-white px-5 py-3 rounded hover:bg-red-600 transition-all duration-200 font-semibold"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
