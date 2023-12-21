import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import "../styles/ChatApp.css";

function ChatApp() {
  const [messages, setMessages] = useState([]);

  //   const handleSendMessage = (newMessage) => {
  //     setMessages([...messages, newMessage]);
  //   };
  const handleSendMessage = async (newMessage) => {
    setMessages((messages) => [
      ...messages,
      { text: newMessage, sender: "user" },
    ]);
    try {
      const response = await fetch("http://localhost:3001/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await response.json();
      console.log(data);
      // handle the response...

      setMessages((messages) => [...messages, { text: data, sender: "ai" }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(messages);
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="chat-app">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatApp;
