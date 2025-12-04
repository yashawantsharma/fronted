import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { toggleView } from "../features/viewSlice";
import { setSelectedRestaurant, setSearchText } from "../features/restaurantSlice";
import { openSidebar } from "../features/sidebarSlice";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const mode = useSelector((state) => state.view.mode);
  


  const restaurantList = useSelector((state) => state.restaurants.data);
  const selected = useSelector((state) => state.restaurants.selected);

  const cart = useSelector((state) => state.cart.items);

  const nav = () => {
    navigate("/chat");
  };

  return (
    <header
      style={{
        background: theme === "dark" ? "#222" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
      className="w-full shadow-sm p-4 flex justify-between items-center sticky top-0 z-50"
    >
      <button  onClick={() => dispatch(openSidebar())} className="text-2xl mr-4">
        ☰
      </button>

      <Link to="/" className="text-2xl font-bold text-red-600">
        FoodExpress
      </Link>

      <div
        className="w-1/3 px-3 py-2 rounded-full flex items-center"
        style={{
          background: theme === "dark" ? "#333" : "#eee",
          color: theme === "dark" ? "white" : "black",
        }}
      >
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full bg-transparent outline-none"
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <span>🔍</span>
      </div>

      <div className="relative z-40">
        <select
          value={selected}
          onChange={(e) => dispatch(setSelectedRestaurant(e.target.value))}
          className="px-3 py-2 border-2 rounded-lg"
        >
          <option value="">All Restaurants</option>

          {restaurantList.map((r, index) => (
            <option key={index} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-6">

        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 rounded-full border"
          style={{
            background: theme === "dark" ? "white" : "black",
            color: theme === "dark" ? "black" : "white",
          }}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <Link to="/cart" className="relative text-2xl">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => dispatch(toggleView())}
          className="px-3 py-2 text-white rounded text-xl"
        >
          {mode === "card" ? "📊" : "🔲"}
        </button>

        {/* <button
          onClick={nav}
          className="
            fixed bottom-6 right-6
            z-30
            bg-gradient-to-r from-purple-600 to-indigo-600
            text-white px-5 py-3 rounded-full shadow-xl
            text-xl font-bold hover:scale-110 transition-all
          "
        >
          🤖 AI
        </button> */}

        <Link to="/login" className="px-4 py-2 rounded-full border">
          Login
        </Link>

        <Link to="/signup" className="px-4 py-2 rounded-full bg-red-500 text-white">
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
