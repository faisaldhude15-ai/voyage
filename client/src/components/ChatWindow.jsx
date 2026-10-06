import {
  useEffect,
  useState,
} from "react";

import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [open, setOpen] =
    useState(false);

  const [conversationId, setConversationId] =
    useState(
      localStorage.getItem(
        "conversationId"
      )
    );

  useEffect(() => {
    const handleStorage = () => {
      setConversationId(
        localStorage.getItem(
          "conversationId"
        )
      );
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  if (!open) {
    return (
      <button
        className="chat-widget-button"
        onClick={() => setOpen(true)}
        aria-label="Open VoyageAI chat"
      >
        <span>✦</span>
      </button>
    );
  }

  return (
    <div className="chat-widget-container">

      <ChatWindow
        conversationId={
          conversationId
        }
        onBack={() => setOpen(false)}
      />

    </div>
  );
};

export default ChatWidget;