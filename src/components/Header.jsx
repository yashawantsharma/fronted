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

  const handelCart = () => {
    const user = sessionStorage.getItem("login");
    if (!user) {
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const user = sessionStorage.getItem("login");

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    navigate("/login");
  };


  return (
    <header
      className={`w-full shadow-sm p-2 sm:p-4 flex flex-nowrap justify-between items-center sticky top-0 z-50 ${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"
        }`}
    >

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button onClick={() => dispatch(openSidebar())} className="text-2xl">
          ☰
        </button>
        <Link to="/" className="text-xl sm:text-2xl font-bold text-red-600">
          FoodExpress
        </Link>
      </div>


      <div
        className={`flex items-center flex-grow mx-2 min-w-0 ${theme === "dark" ? "bg-[#333] text-white" : "bg-[#eee] text-black"
          } rounded-full px-2 sm:px-3`}
        style={{ minHeight: "40px" }}
      >
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full bg-transparent outline-none truncate text-sm sm:text-base"
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <span>🔍</span>
      </div>


      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">

        <select
          value={selected}
          onChange={(e) => dispatch(setSelectedRestaurant(e.target.value))}
          className={`hidden sm:block px-2 sm:px-3 sm:py-2 border-2 rounded-lg text-sm sm:text-base ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
            }`}
        >
          <option value="">All Restaurants</option>
          {restaurantList.map((r, index) => (
            <option key={index} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-2 sm:px-3 py-1 sm:py-2 rounded-full border flex items-center justify-center text-base"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>

        <button className="relative text-2xl" onClick={handelCart}>
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </button>


        <button
          onClick={() => dispatch(toggleView())}
          className="px-2 sm:px-3 py-1 sm:py-2 text-white rounded text-xl"
        >
          {mode === "card" ? "📊" : "🔲"}
        </button>


        {user ? (
          <button
            onClick={handleLogout}
            className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border text-sm sm:text-base"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border text-sm sm:text-base"
            >
              <span className="sm:hidden">L</span>
              <span className="hidden sm:inline">Login</span>
            </Link>

            <Link
              to="/signup"
              className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-red-500 text-white text-sm sm:text-base"
            >
              <span className="sm:hidden">S</span>
              <span className="hidden sm:inline">Sign Up</span>
            </Link>
          </>
        )}

      </div>
    </header>
  );
};

export default Header;
