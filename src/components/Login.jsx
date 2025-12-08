import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'   // <-- ADD THIS

const Login = ({ setLogin }) => {

  const theme = useSelector((state) => state.theme.mode);  // <-- THEME GET

  const [formdata, setFormdata] = useState({
    name: '',
    password: '',
  })

  const [error, setError] = useState({})
  const navigate = useNavigate()

  const forml = (e) => {
    e.preventDefault()

    const resul = JSON.parse(localStorage.getItem("user"))
    setFormdata({
      name: '',
      password: '',
    })

    let result = {};
    if (!formdata.name) result.name = "* name is required";
    if (!formdata.password) result.password = "* Password is required";
    setError(result);
     if (Object.keys(result).length === 0) {
      alert("submit successfully")
      sessionStorage.setItem("login", JSON.stringify(formdata))
      navigate("/")
      return;
     }
    
  }

  return (
    <div className={` flex justify-center items-center 
      ${theme === "dark" ? "bg-[#000] text-white" : "bg-white text-black"}`}
    >
      <form onSubmit={forml}
        className={`p-8 rounded-xl shadow-xl border w-96 
        ${theme === "dark" ? "bg-[#111] text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
      >
        <h1 className='text-center text-xl font-bold mb-6'>Login</h1>

        <div>


          <label className='block'>
            UserName :-
            <input
              type="text"
              placeholder='Enter Username'
              className={`border rounded-full text-center mt-3 p-2 w-full 
              ${theme === "dark"
                  ? "bg-[#000] text-white border-gray-600"
                  : "bg-white text-black border-gray-400"
                }`}
              value={formdata.name}
              onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
          </label>


          <label className='block mt-4'>
            Password :-
            <input
              type="password"
              placeholder='Enter Password'
              className={`border rounded-full text-center mt-3 p-2 w-full 
              ${theme === "dark"
                  ? "bg-[#000] text-white border-gray-600"
                  : "bg-white text-black border-gray-400"
                }`}
              value={formdata.password}
              onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
            />
            {error.password && <p className="text-red-500">{error.password}</p>}
          </label>


          <button
            type='submit'
            className={`rounded-full border mt-6 p-3 w-full font-bold
            ${theme === "dark"
                ? "bg-[#000] text-white border-gray-700"
                : "bg-white text-black border-gray-400"
              }`}
          >
            Submit
          </button>


          <div className="text-center mt-5">
            <Link to="/signup"
              className={`underline 
                ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}
            >
              Signup
            </Link>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Login
