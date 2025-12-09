import { useDispatch, useSelector } from "react-redux";
import { storeMessage } from "../features/chatSlice";
import { toggleTheme } from "../features/themeSlice";
import { toggleView, setView } from "../features/viewSlice";
import { setAddress } from "../features/orderSlice";
import { clearCart, decrementQty } from "../features/cartSlice";
import { toggleLike } from "../features/likedSlice";
import { cancelOrder } from "../features/orderSlice";

const Question = () => {
  const dispatch = useDispatch();

  const orders = useSelector((s) => s.order.list);
  const address = useSelector((s) => s.order.address);
  const restaurants = useSelector((s) => s.restaurants.data);
  const theme = useSelector((s) => s.theme.mode);
  const liked = useSelector((s) => s.liked.items);
  const cart = useSelector((s) => s.cart.items);

  const processQuestion = (text) => {
    const q = text.toLowerCase();
    let answer = "Sorry, I did not understand that.";

    if (q.includes("last order")) {
      if (!orders.length) answer = "You haven’t placed any orders yet!";
      else {
        const last = orders[orders.length - 1];
        answer = `Your last order was from ${last.restaurant}, ${last.items.length} items, total ₹${last.items.reduce((acc, i) => acc + i.price * i.qty, 0)}.`;
      }
    }
    else if (q.includes("total orders") || q.includes("how many orders")) {
      answer = `You have placed ${orders.length} order${orders.length !== 1 ? "s" : ""}.`;
    }
    else if (q.includes("order items") || q.includes("what did i order")) {
      if (!orders.length) answer = "No previous orders found.";
      else {
        const last = orders[orders.length - 1];
        answer = last.items.map((i) => `${i.name} × ${i.qty}`).join(", ");
      }
    }
    else if (q.includes("order price") || q.includes("last order price")) {
      if (!orders.length) answer = "No orders placed yet.";
      else {
        const last = orders[orders.length - 1];
        const total = last.items.reduce((acc, i) => acc + i.price * i.qty, 0);
        answer = `Your last order cost ₹${total}.`;
      }
    }
    else if (q.includes("cancel order") || q.includes("delete order")) {
      const last = orders[orders.length - 1];
      if (!last) answer = "No orders to cancel!";
      else {
        dispatch(cancelOrder(last.id));
        answer = `Your last order from ${last.restaurant} has been cancelled.`;
      }
    }
    else if (q.includes("delete cart") || q.includes("clear cart")) {
      if (!cart.length) answer = "Your cart is already empty!";
      else {
        dispatch(clearCart());
        answer = "All items have been removed from your cart.";
      }
    }
    else if (q.includes("cart count") || q.includes("how many items in cart")) {
      answer = `You have ${cart.length} item${cart.length !== 1 ? "s" : ""} in your cart.`;
    }
    else if (q.includes("remove") && q.includes("from cart")) {
      const match = cart.find((i) => q.includes(i.name.toLowerCase()));
      if (match) {
        dispatch(decrementQty(match.name));
        answer = `${match.name} has been removed/decremented from your cart.`;
      } else {
        answer = "Item not found in your cart.";
      }
    }
    else if (q.includes("delete liked") || q.includes("remove liked") || q.includes("unlike")) {
      const match = liked.find((i) => q.includes(i.name.toLowerCase()));
      if (match) {
        dispatch(toggleLike(match));
        answer = `${match.name} has been removed from your liked items.`;
      } else {
        answer = "Item not found in your liked list.";
      }
    }
    else if (q.includes("liked count") || q.includes("how many liked")) {
      answer = `You have ${liked.length} liked item${liked.length !== 1 ? "s" : ""}.`;
    }

    else if (q.includes("delete address") || q.includes("clear address")) {
      if (!address) answer = "No address is saved to delete.";
      else {
        dispatch(setAddress(null));
        answer = "Your address has been deleted.";
      }
    }
    else if (q.includes("address count") || q.includes("how many addresses")) {
      answer = address ? "You have 1 saved address." : "You have no saved addresses.";
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
    else if (q.includes("pizza")) {
      const pizzaRes = restaurants.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase().includes("pizza"))
      );
      answer = pizzaRes.length
        ? `Pizza places: ${pizzaRes.map((r) => r.name).join(", ")}`
        : "No pizza restaurants found.";
    }
    else if (q.includes("suggest") && q.includes("food")) {
      answer = "How about trying Pizza, Burger or Biryani today?";
    }

    else if (q.includes("delivery time") || q.includes("when will it arrive")) {
      answer = "Your order will be delivered in approximately 30–40 minutes.";
    }
    else if (q.includes("track order") || q.includes("where is my order")) {
      answer = "Your delivery partner is on the way 🚚💨";
    }
    else if (q.includes("hello") || q.includes("hi")) {
      answer = "Hello! How can I assist you today?";
    }
    else if (q.includes("thank you") || q.includes("thanks")) {
      answer = "You're welcome! 😊";
    }

    else if (q.includes("dark mode") || q.includes("switch to dark")) {
      if (theme === "dark") answer = "Dark mode is already enabled!";
      else {
        answer = "Switching to dark mode 🌙";
        dispatch(toggleTheme());
      }
    }
    else if (q.includes("light mode") || q.includes("switch to light")) {
      if (theme === "light") answer = "Light mode is already enabled!";
      else {
        answer = "Switching to light mode ☀️";
        dispatch(toggleTheme());
      }
    }
    else if (q.includes("toggle theme") || q.includes("change theme")) {
      answer = `Theme changed to ${theme === "light" ? "dark" : "light"} mode!`;
      dispatch(toggleTheme());
    }

    else if (q.includes("toggle view") || q.includes("change view")) {
      dispatch(toggleView());
      answer = "View mode toggled!";
    }
    else if (q.includes("card view")) {
      dispatch(setView("card"));
      answer = "Switched to card view!";
    }
    else if (q.includes("table view")) {
      dispatch(setView("table"));
      answer = "Switched to table view!";
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
