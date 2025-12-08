import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../features/likedSlice";

const LikedItems = () => {

  const theme = useSelector((state) => state.theme.mode);
  const liked = useSelector((state) => state.liked.items);
  const viewMode = useSelector((state) => state.view.mode); 

 const dispatch = useDispatch();
  const isLiked = (name) => liked.some((i) => i.name === name);
  const handleLike = (item) => {
    dispatch(toggleLike(item));
  };


  return (
    <div
      className={`mx-auto p-4 min-h-screen ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-5">❤️ Liked Items</h1>

      {liked.length === 0 && <p>No liked items yet.</p>}

      {liked.length > 0 && viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full  ">
            <thead
              className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {liked.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? theme === "dark"
                        ? "bg-[#222]"
                        : "bg-gray-50"
                      : ""
                  }`}
                >
                  <td className="border px-4 py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">
                    ₹{item.price || item.cost_for_two}
                  </td>
                  <td className="border px-4 py-2">{item.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {liked.length > 0 && viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {liked.map((item, index) => (
            <div
              key={index}
              className={`p-7 rounded-lg shadow flex flex-col items-center gap-2 relative ${
                theme === "dark" ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              <button
                    onClick={() => handleLike(item)}
                    className="absolute top-2 right-2 text-2xl"
                  >
                    {isLiked(item.name) ? "❤️" : "🤍"}
                  </button>
              
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-38 h-38 rounded object-cover"
                />
              )}
              <h2 className="text-lg font-semibold">{item.name}</h2>
              
              <p>₹{item.price || item.cost_for_two}</p>
              {item.description && (
                <p className="text-sm text-gray-400 text-center">
                  {item.description}
                </p>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedItems;
