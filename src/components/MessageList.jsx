import React from "react";
import "../styles/ChatApp.css";

function MessageList({ messages }) {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <li
          key={index}
          style={{ textAlign: message.sender === "ai" ? "left" : "right" }}
        >
          {message.text}
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
