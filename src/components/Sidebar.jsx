import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../features/sidebarSlice";

const Sidebar = () => {
     const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const isOpen = useSelector((s) => s.sidebar.isOpen);
    const navigate=useNavigate()

    const handelcart=()=>{
        dispatch(closeSidebar())
        const user = sessionStorage.getItem("login");

    if (!user) {
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/cart");
    }
    }

    const handellike=()=>{
        dispatch(closeSidebar())
         const user = sessionStorage.getItem("login");

    if (!user) {
        dispatch(closeSidebar())
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/liked");
    }
    }

    const handelorder=()=>{
        dispatch(closeSidebar())
         const user = sessionStorage.getItem("login");

    if (!user) {
        dispatch(closeSidebar())
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/orders");
    }
    }

    const handeladdress=()=>{
        dispatch(closeSidebar())
        const user = sessionStorage.getItem("login");

    if (!user) {
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/address");
    }
    }

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
                <div className="flex justify-between">
                    <div> <h2 className="text-2xl font-bold">Menu  </h2>
                    </div>
                    <div><p className="ml-27"> ✖</p> </div>
               
                </div>
            </button>

            

            <nav className="flex flex-col gap-4 text-lg">

                <Link to="/" onClick={() => dispatch(closeSidebar())}className="hover:text-red-500 ml-2">
                    🏠 Home
                </Link>

                <button onClick={() => handelcart()}className="hover:text-red-500 mr-35">
                    🛒 Cart
                </button>

                <button
                    onClick={() => handellike()}
                    className="hover:text-red-500 mr-22"
                >
                    ❤️ Liked Items
                </button>


                <button onClick={() =>handelorder()}className="hover:text-red-500 mr-25">
                    📦 My Orders
                </button>

                {/* <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                    👤 Profile
                </Link> */}

                {/* <Link to="/settings" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                    ⚙️ Settings
                </Link> */}
                <button
                    onClick={() => handeladdress()}
                    className="hover:text-red-500 mr-22"
                >
                    📍 My Address
                </button>

            </nav>
        </div>
    );
};

export default Sidebar;
