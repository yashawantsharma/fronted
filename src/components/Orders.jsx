import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, updateTimer } from "../features/orderSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Orders = () => {
  const order = useSelector((state) => state.order.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">

      <h1 className="text-2xl font-bold mb-5">📦 My Orders</h1>

      {order.length === 0 && <p>No orders found.</p>}

      {order.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-4 rounded-lg shadow"
        >

          <h2 className="text-xl font-semibold mb-2">
            Order ID: {order.id}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            Date: {order.date}
          </p>

          <h3 className="font-semibold mb-1">Items:</h3>

          {order.items.map((item, index) => (
            <p key={index} className="ml-4">
              <LazyLoadImage
                src={item.image}
                // effect="blur"
                className=" h-30 rounded-lg "
              />
              {item.name} × {item.qty || 1} — ₹{item.price}
            </p>
          ))}

          <h3 className="font-semibold mt-3">
            Total: ₹
            {order.items.reduce(
              (acc, item) => acc + item.price * (item.qty || 1),
              0
            )}
          </h3>

          <p className="text-sm mt-2">
            Status: <strong>{order.status}</strong>
          </p>

          <p className="text-sm">
            Estimated Delivery:{" "}
            {Math.floor(order.deliveryTime / 60)}:
            {(order.deliveryTime % 60).toString().padStart(2, "0")}
          </p>

          <button
            onClick={() => dispatch(cancelOrder(order.id))}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
