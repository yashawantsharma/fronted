import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../features/restaurantSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const theme = useSelector((state) => state.theme.mode);
  const viewMode = useSelector((state) => state.view.mode);
  const dispatch = useDispatch();
  // const { data, loading } = useSelector((state) => state.restaurants);
   const data = useSelector((s) => s.restaurants.filteredData);
  const selectedRestaurant = useSelector((state) => state.restaurants.selected);
  const loading = useSelector((state) => state.restaurants.loading);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center mt-43 mb-43">
  <div className="w-20 h-20 border-9 border-gray-300 border-t-blue-500 rounded-full animate-spin "></div>
</div>

    );


  // const filtered = data.filter((item) => {
  //   const name = item?.name?.toLowerCase() || "";
  //   const searchText = search?.toLowerCase() || "";
  //   return name.includes(searchText);
  // });




  // console.log(data._id)

  return (
    <div className={`h-auto  ${theme === "dark"
      ? "bg-[#111] text-white"
      : "bg-white text-black"
      }`}>
      <div className={`max-w-6xl mx-auto px-4 py-8 ${theme === "dark"
        ? "bg-[#111] text-white"
        : "bg-white text-black"
        }`}>

        <h1 className="text-2xl font-bold mb-4">Popular Restaurants</h1>

        {viewMode === "card" && (<div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${theme === "dark"
          ? "bg-[#111] text-white"
          : "bg-white text-black"
          }`}>

          {data.map((item, index) => (
            <Link to={`/detail/${index}`} key={index}>

              <div className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-200 border overflow-hidden  ${theme === "dark"
                ? "bg-[#111] text-white"
                : "bg-white text-black"
                }`}>


                <div className="w-full h-56 overflow-hidden rounded-t-2xl">
                  <LazyLoadImage
                    src={item.image}
                    effect="blur"
                    wrapperProps={{

                      style: { transitionDelay: "1s" },
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                </div>


                <div className={`flex items-center justify-between px-4 p-4  ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}>
                  <p className="text-sm-bold font-semibold text-gray-800">

                    ₹{item.cost_for_two}
                  </p>

                  <p className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                    ⭐ {item.rating}
                  </p>
                </div>


                <div className={`p-4 ${
        theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
      }`}>
                  <h2 className="font-semibold text-lg text-gray-800 truncate">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500 truncate">
                    {Array.isArray(item.cuisines)
                      ? item.cuisines.join(", ")
                      : item.cuisines}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
        )}
        {viewMode === "table" && (
          
          <table className="w-full  overflow-x-auto border mt-6 text-left">
            <thead>
              <tr className=" border-b">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Cuisines</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
               
                <tr
                  key={index}
                  className="border-b  cursor-pointer"
                >
                  
                  <td className="p-3">
                    <Link to={`/detail/${index}`}>
                    <img
                      src={item.image}
                      className="w-20 h-16 rounded object-cover"
                    />
                    </Link>
                  </td>
                 <Link to={`/detail/${index}`}>
                  <td className="p-2 font-semibold">{item.name}</td>
                </Link>
                  <td className=" text-sm">
                    <Link to={`/detail/${index}`}>
                    {Array.isArray(item.cuisines)
                      ? item.cuisines.join(", ")
                      : item.cuisines}
                      </Link>
                  </td>

                  <td className="p-3">₹{item.cost_for_two}</td>

                  <td className="p-3">⭐ {item.rating}</td>
                  
                </tr>
                     
              ))}
            </tbody>
          </table>
          
        )}


        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No restaurants found
          </p>
        )}


      </div>
    </div>
  );
};

export default Home;

