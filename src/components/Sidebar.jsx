import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../features/sidebarSlice";

const Sidebar = () => {
     const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const isOpen = useSelector((s) => s.sidebar.isOpen);

    return (
        <div
            className={`fixed top-20 left-0 h-full w-64 p-5 shadow-lg transition-transform duration-300 z-50 
      ${theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"} 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            
            <button
                onClick={() => dispatch(closeSidebar())}
                className="text-2xl mb-5"
            >
                ✖
            </button>

            <h2 className="text-2xl font-bold mb-6">Menu</h2>

            <nav className="flex flex-col gap-4 text-lg">

                <Link to="/" onClick={() => dispatch(closeSidebar())}className="hover:text-red-500">
                    🏠 Home
                </Link>

                <Link to="/cart" onClick={() => dispatch(closeSidebar())}className="hover:text-red-500">
                    🛒 Cart
                </Link>

                <Link
                    to="/liked"
                    onClick={() => dispatch(closeSidebar())}
                    className="hover:text-red-500"
                >
                    ❤️ Liked Items
                </Link>


                <Link to="/orders" onClick={() => dispatch(closeSidebar())}className="hover:text-red-500">
                    📦 My Orders
                </Link>

                {/* <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                    👤 Profile
                </Link> */}

                {/* <Link to="/settings" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                    ⚙️ Settings
                </Link> */}
                <Link
                    to="/address"
                    onClick={() => dispatch(closeSidebar())}
                    className="hover:text-red-500"
                >
                    📍 My Address
                </Link>

            </nav>
        </div>
    );
};

export default Sidebar;
