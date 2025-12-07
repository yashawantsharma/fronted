import { useDispatch, useSelector } from "react-redux";
import { storeMessage } from "../features/chatSlice";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const orders = useSelector((s) => s.order.list);
  const address = useSelector((s) => s.order.address);
  const restaurants = useSelector((s) => s.restaurants.data);
  const theme=useSelector((s)=>s.theme.mode)
const liked = useSelector((state) => state.liked.items);
const order = useSelector((state) => state.order.list);
const cart = useSelector((state) => state.cart.items);

  const processQuestion = (text) => {
    const q = text.toLowerCase();
    let answer = "Sorry, I did not understand that.";

    if (q.includes("last order") || q.includes("recent order")) {
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

    else if (q.includes("what did i order") || q.includes("last order items")) {
      if (!orders.length) {
        answer = "No previous orders found.";
      } else {
        const last = orders[orders.length - 1];
        answer = last.items.map((i) => `${i.name} × ${i.qty}`).join(", ");
      }
    }


    else if (q.includes("order price") || q.includes("last order price")) {
      if (!orders.length) {
        answer = "You haven't placed any orders yet.";
      } else {
        const last = orders[orders.length - 1];
        const total = last.items.reduce((acc, i) => acc + i.price * i.qty, 0);
        answer = `Your last order cost ₹${total}.`;
      }
    }


    else if (q.includes("when") && q.includes("last order")) {
      if (!orders.length) answer = "No order history found.";
      else answer = `Your last order was on ${orders[orders.length - 1].date}.`;
    }


    else if (q.includes("my address") || q.includes("delivery address")) {
      answer = address ? `Your address is ${address}` : "No address saved.";
    }

    else if (q.includes("suggest restaurant") || q.includes("recommend restaurant")) {
      const top = restaurants.slice(0, 3).map((r) => r.name).join(", ");
      answer = `Top restaurants near you: ${top}.`;
    }


    else if (q.includes("top rated") || q.includes("best rating")) {
      const sorted = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);
      answer = `Top rated places: ${sorted.map((r) => r.name).join(", ")}`;
    }


    else if (q.includes("cheap") || q.includes("budget")) {
      const cheap = restaurants.filter((r) => r.cost_for_two < 300);
      answer = cheap.length
        ? `Budget restaurants: ${cheap.map((r) => r.name).join(", ")}`
        : "No cheap restaurants found.";
    }

    else if (q.includes("expensive") || q.includes("premium")) {
      const costly = restaurants.filter((r) => r.cost_for_two > 600);
      answer = costly.length
        ? `Premium restaurants: ${costly.map((r) => r.name).join(", ")}`
        : "No expensive restaurants found.";
    }

    else if (q.includes("suggest") && q.includes("food")) {
      answer = "How about trying Pizza, Burger or Biryani today?";
    }


    else if (q.includes("pizza")) {
      const pizzaRes = restaurants.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase().includes("pizza"))
      );
      answer = pizzaRes.length
        ? `Pizza places: ${pizzaRes.map((r) => r.name).join(", ")}`
        : "No pizza restaurants found.";
    }

    else if (q.includes("delivery time") || q.includes("when will it arrive")) {
      answer = "Your order will be delivered in approximately 30–40 minutes.";
    }

    else if (q.includes("where is my order") || q.includes("track order")) {
      answer = "Your delivery partner is on the way 🚚💨";
    }

    else if (q.includes("hello") || q.includes("hi")) {
      answer = "Hello! How can I assist you today?";
    }

      if (
      q.includes("dark mode") ||
      q.includes("enable dark") ||
      q.includes("switch to dark")
    ) {
      if (theme === "dark") {
        answer = "Dark mode is already enabled!";
      } else {
        answer = "Switching to dark mode 🌙";
        dispatch(toggleTheme());
      }
    }

    else if (
      q.includes("light mode") ||
      q.includes("enable light") ||
      q.includes("switch to light")
    ) {
      if (theme === "light") {
        answer = "Light mode is already enabled!";
      } else {
        answer = "Switching to light mode ☀️";
        dispatch(toggleTheme());
      }
    }

    else if (q.includes("change theme") || q.includes("toggle theme")) {
      answer = `Theme changed to ${theme === "light" ? "dark" : "light"} mode!`;
      dispatch(toggleTheme());
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
