import React from "react";
import { useSelector } from "react-redux";

const LikedItems = () => {
  const liked = useSelector((state) => state.liked.items); 

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-5">❤️ Liked Items</h1>

      {liked.length === 0 && <p>No liked items yet.</p>}

      {liked.map((item, index) => (
        <div
          key={index}
          className="border p-4 mb-4 rounded-lg shadow flex items-center gap-4"
        >
         
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded object-cover"
            />
          )}

          <div>
            <h2 className="text-lg font-semibold">{item.name}</h2>

            <p className="text-gray-700">
              ₹{item.price || item.cost_for_two}
            </p>

            {item.description && (
              <p className="text-sm text-gray-500">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedItems;
