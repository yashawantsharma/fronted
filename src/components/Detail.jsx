import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {addToCart,incrementQty,decrementQty,} from "../features/cartSlice";
import { toggleLike } from "../features/likedSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Detail = () => {
  const theme = useSelector((state) => state.theme.mode);
  const cart = useSelector((state) => state.cart.items);
  const liked = useSelector((state) => state.liked.items);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://backend1-hv8q.onrender.com/find");
      setRestaurant(res.data[Number(id)]);
    }
    fetchData();
  }, [id]);

  const getQty = (item) => {
    const found = cart.find((c) => c.name === item.name);
    return found ? found.qty : 0;
  };

  const handleAdd = (item) => dispatch(addToCart(item));
  const handleIncrement = (item) => dispatch(incrementQty(item.name));
  const handleDecrement = (item) => dispatch(decrementQty(item.name));

  const isLiked = (name) => liked.some((i) => i.name === name);
  const handleLike = (item) => dispatch(toggleLike(item));

  if (!restaurant)
    return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div
      className={`max-w-5xl mx-auto mt-8 mb-20 ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full h-72 overflow-hidden flex rounded-2xl shadow-md relative">
        <LazyLoadImage
          src={restaurant.image}
          effect="blur"
          className="w-full h-full object-cover"
        />

        <p className="ml-20">
          <span className="font-semibold">name : </span> {restaurant.name} <br />
          <span className="font-semibold">rating : </span> {restaurant.rating} <br />
          <span className="font-semibold">rating_count : </span> {restaurant.rating_count} <br />
          <span className="font-semibold">address : </span> {restaurant.address} <br />
          <span className="font-semibold">city : </span> {restaurant.city} <br />
          <span className="font-semibold">service_status : </span> {restaurant.service_status} <br />
          <span className="font-semibold">delivery_fee : </span> {restaurant.delivery_fee} <br />
          <span className="font-semibold">min_order_value : </span> {restaurant.min_order_value} <br />
        </p>
      </div>

      
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Recommended Items</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {restaurant.menu?.map((item, index) => {
            const qty = getQty(item);

            return (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition relative"
              >
               
                <button
                  onClick={() => handleLike(item)}
                  className="absolute top-2 right-2 text-2xl"
                >
                  {isLiked(item.name) ? "❤️" : "🤍"}
                </button>

                <LazyLoadImage
                  src={item.image}
                  effect="blur"
                  className="w-full h-40 rounded-lg object-cover"
                />

                <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-2 font-semibold">₹{item.price}</p>

                {qty === 0 ? (
                  <button
                    onClick={() => handleAdd(item)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-3 flex items-center justify-between bg-red-500 text-white py-2 rounded px-3">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-4 text-xl font-bold"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">{qty}</span>

                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-4 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
