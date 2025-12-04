import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { incrementQty, decrementQty } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const cart = useSelector((state) => state.cart.items);

  const increment = (item) => {
    dispatch(incrementQty(item.name));
  };

  const decrement = (item) => {
    dispatch(decrementQty(item.name));
  };

  const proceedToPayment = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to continue");
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div
      className={`max-w-lg mx-auto full p-4 mb-8 ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p className="mb-71">Your cart is empty</p>}

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <LazyLoadImage
              src={item.image}
              effect="blur"
              className="w-full h-full object-cover"
            />

            <p className="font-semibold">{item.name}</p>
            <p className="text-sm">₹{item.price}</p>

            <p className="bg-green-200 text-green-700 px-2 py-1 rounded font-semibold mr-45">
              {item.rating}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-red-500 text-white px-3 py-1 rounded-full mt-60">
            <button onClick={() => decrement(item)} className="text-xl font-bold">
              -
            </button>

            <span className="text-lg font-semibold">{item.qty}</span>

            <button onClick={() => increment(item)} className="text-xl font-bold">
              +
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="mt-5 text-lg font-semibold">
            Total Amount: <span className="text-red-500">₹{total}</span>
          </div>

          <button
            onClick={proceedToPayment}
            className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg mb-31 font-semibold hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
