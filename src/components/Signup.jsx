import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Signup = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});

  const forml = (e) => {
    e.preventDefault();

    let result = {};
    if (!formdata.name) result.name = "* name is required";
    if (!formdata.email) result.email = "* Email is required";
    if (!formdata.phone) result.phone = "* Phone is required";
    if (!formdata.password) result.password = "* Password is required";

    setError(result);

    if (Object.keys(result).length === 0) {
      alert("Submitted successfully");
      localStorage.setItem("user", JSON.stringify(formdata));
      sessionStorage.setItem("login", JSON.stringify(formdata));
      navigate("/");
      setFormdata({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    }
  };

  return (
    <div
      className={`flex justify-center items-center ${
        theme === "dark" ? "bg-[#000] text-white" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={forml}
        className={`p-8 rounded-xl shadow-xl border ${
          theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-center text-xl font-bold mb-6">Sign Up</h1>

        {/* Username */}
        <label className="block mb-4">
          UserName :-
          <input
            type="text"
            placeholder="Enter Username"
            className={`border rounded-full w-full mt-2 p-2 text-center ${
              theme === "dark"
                ? "bg-[#000] text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={formdata.name}
            onChange={(e) =>
              setFormdata({ ...formdata, name: e.target.value })
            }
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
        </label>

        {/* Email */}
        <label className="block mb-4">
          Email :-
          <input
            type="email"
            placeholder="Enter Email"
            className={`border rounded-full w-full mt-2 p-2 text-center ${
              theme === "dark"
                ? "bg-[#000] text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
        </label>

        {/* Phone */}
        <label className="block mb-4">
          Phone :-
          <input
            type="number"
            placeholder="Enter Phone"
            className={`border rounded-full w-full mt-2 p-2 text-center ${
              theme === "dark"
                ? "bg-[#000] text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={formdata.phone}
            onChange={(e) =>
              setFormdata({ ...formdata, phone: e.target.value })
            }
          />
          {error.phone && <p className="text-red-500">{error.phone}</p>}
        </label>

        {/* Password */}
        <label className="block mb-4">
          Password :-
          <input
            type="password"
            placeholder="Enter Password"
            className={`border rounded-full w-full mt-2 p-2 text-center ${
              theme === "dark"
                ? "bg-[#000] text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </label>

       
        <button
          type="submit"
          className={`rounded-full border mt-5 p-3 w-full font-bold ${
            theme === "dark"
              ? "bg-[#000] text-white border-gray-600"
              : "bg-white text-black border-gray-400"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
