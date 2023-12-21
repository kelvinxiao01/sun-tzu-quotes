import React, { useState } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import "../styles/ChatApp.css";

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-app">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatApp;
