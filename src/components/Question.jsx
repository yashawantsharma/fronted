import { useDispatch } from "react-redux";
import { storeMessage } from "../features/chatSlice";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user")) || {};

    const orders = useSelector((state) => state.order.list);
  const address = useSelector((state) => state.order.address);
  const restaurants = useSelector((state) => state.restaurants.data);
  const theme = useSelector((state) => state.theme.mode);
    const viewMode = useSelector((state) => state.view.mode);
  const cart = useSelector((state) => state.cart.items);


  const processQuestion = (text) => {
    const q = text.toLowerCase();
    let answer = "Sorry, I did not understand that.";


    if (q.includes("who") || q.includes("i")) {
      answer = `You are ${user?.name || "a Guest User"}`;
    }

    if (q.includes("my") || q.includes("name")) {
      answer = `Your name is ${user?.name || "not saved"}`;
    }

    if (q.includes("my") || q.includes("email")) {
      answer = `Your email is ${user?.email || "not saved"}`;
    }

    if (q.includes("my") || q.includes("phone")) {
      answer = `Your phone number is ${user?.phone || "not saved"}`;
    }

     if (q.includes("who my last order") || q.includes("recent order")) {
      if (!orders.length) {
        answer = "You haven’t placed any orders yet!";
      } else {
        const last = orders[orders.length - 1];
        answer = `Your last order was from ${last.restaurant}, total ${last.items.length} items.`;
      }
    }

        else if (q.includes("how many orders") || q.includes("total orders")) {
      answer = `You have placed ${orders.length} orders.`;
    }

        else if (q.includes("when") && q.includes("last order")) {
      if (!orders.length) answer = "No order history found.";
      else answer = `Your last order was on ${orders[orders.length - 1].date}.`;
    }



    dispatch(
      storeMessage({
        question: text,
        answer,
      })
    );
  };

  return { processQuestion };
};

export default Question;
