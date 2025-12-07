import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaComments } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Question from "./Question";

const Chat = () => {
  const { processQuestion } = Question();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [thinking, setThinking] = useState(false);  // ⭐ NEW

  const theme = useSelector((state) => state.theme.mode);
  const messages = useSelector((state) => state.chat.messages);

  // ⭐ UPDATED sendMessage
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userQuestion = input;
    setInput("");

 
    setThinking(true);


    setTimeout(() => {
      setThinking(false); 

      processQuestion(userQuestion);

    }, 2000);
  };

  const ButtonChat = () => {
    const login = sessionStorage.getItem("login");
    if (!login) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    setOpenChat(true);
  };

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#111] text-white" : "bg-white text-black"
        }`}
      >
        {!openChat && (
          <button
            onClick={ButtonChat}
            className="fixed bottom-5 right-5 z-[999] bg-blue-600 hover:bg-blue-700 
                     text-white p-4 rounded-full shadow-xl text-2xl"
          >
            <FaComments />
          </button>
        )}

        {openChat && (
          <div
            className="fixed bottom-0 right-0 w-[370px] h-[500px] bg-white shadow-2xl 
                        border rounded-t-xl z-[999] flex flex-col"
          >
            <div className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white rounded-t-xl">
              <h2 className="text-xl font-bold">Chat Bar</h2>

              <IoClose
                size={26}
                onClick={() => setOpenChat(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              
              {thinking && (
                <p className="text-gray-500 italic mb-3">Thinking...</p>
              )}

              {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold text-blue-600">Question</p>
                  <p className="ml-3">{msg.question}</p>

                  <p className="font-bold text-green-600 mt-2">Answer</p>
                  <p className="ml-3">{msg.answer}</p>

                  <hr className="my-2" />
                </div>
              ))}
            </div>

            <div className="flex p-3 border-t bg-gray-100">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 border rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
