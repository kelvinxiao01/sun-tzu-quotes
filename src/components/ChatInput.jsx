import React, { useState } from "react";
import "../styles/ChatApp.css";

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
