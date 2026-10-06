import {
  useEffect,
  useRef,
  useState,
} from "react";

import useChat from "../hooks/useChat";

const ChatWindow = ({
  conversationId,
  onBack,
}) => {
  const [input, setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const {
    messages,
    loading,
    sending,
    error,
    status,

    loadConversation,
    sendMessage,
    requestAgent,
    sendHumanMessage,
  } = useChat(conversationId);

  // ==========================================
  // LOAD EXISTING CHAT
  // ==========================================

  useEffect(() => {
    const id =
      conversationId ||
      localStorage.getItem(
        "conversationId"
      );

    if (id) {
      loadConversation(id);
    }
  }, [
    conversationId,
    loadConversation,
  ]);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==========================================
  // SEND
  // ==========================================

  const handleSend = async (event) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || sending) {
      return;
    }

    setInput("");

    try {
      if (
        status === "HUMAN_ACTIVE" ||
        status === "ASSIGNED"
      ) {
        await sendHumanMessage(text);
      } else {
        await sendMessage(text);
      }
    } catch {
      setInput(text);
    }
  };

  // ==========================================
  // REQUEST AGENT
  // ==========================================

  const handleRequestAgent =
    async () => {
      if (sending) {
        return;
      }

      try {
        await requestAgent();
      } catch {
        // Error already handled by hook
      }
    };

  // ==========================================
  // MESSAGE TEXT
  // ==========================================

  const getMessageText = (
    message
  ) => {
    return (
      message.content ||
      message.message ||
      message.text ||
      message.body ||
      ""
    );
  };

  // ==========================================
  // MESSAGE TYPE
  // ==========================================

  const getSenderType = (
    message
  ) => {
    const type =
      message.senderType ||
      message.senderRole ||
      message.role ||
      message.sender?.role;

    if (
      type === "customer" ||
      type === "user"
    ) {
      return "customer";
    }

    if (
      type === "agent" ||
      type === "human"
    ) {
      return "agent";
    }

    return "ai";
  };

  return (
    <div className="chat-window">

      {/* HEADER */}

      <div className="chat-header">

        <div className="chat-header-left">

          {onBack && (
            <button
              className="chat-back-button"
              onClick={onBack}
            >
              ←
            </button>
          )}

          <div className="chat-ai-avatar">
            ✦
          </div>

          <div>
            <h3>VoyageAI</h3>

            <div className="chat-status">

              <span
                className={
                  connectedStatusClass(
                    status
                  )
                }
              ></span>

              {status ===
              "WAITING_FOR_AGENT"
                ? "Waiting for agent"
                : status ===
                  "HUMAN_ACTIVE"
                ? "Human agent"
                : status ===
                  "ASSIGNED"
                ? "Agent assigned"
                : "AI Assistant"}

            </div>
          </div>

        </div>

      </div>

      {/* MESSAGES */}

      <div className="chat-messages">

        {loading && (
          <div className="chat-loading">
            Loading conversation...
          </div>
        )}

        {!loading &&
          messages.length === 0 && (
            <div className="chat-welcome">

              <div className="welcome-icon">
                ✈️
              </div>

              <h2>
                Hi! I'm VoyageAI
              </h2>

              <p>
                Tell me where you want to
                travel and I'll help you
                plan your perfect trip.
              </p>

              <div className="suggestion-buttons">

                <button
                  onClick={() =>
                    setInput(
                      "I want to plan a 5-day trip to Dubai."
                    )
                  }
                >
                  Dubai Trip
                </button>

                <button
                  onClick={() =>
                    setInput(
                      "Help me plan a budget-friendly trip."
                    )
                  }
                >
                  Budget Trip
                </button>

                <button
                  onClick={() =>
                    setInput(
                      "I want to plan a family vacation."
                    )
                  }
                >
                  Family Trip
                </button>

              </div>

            </div>
          )}

        {messages.map(
          (message, index) => {
            const sender =
              getSenderType(message);

            return (
              <div
                key={
                  message._id ||
                  `message-${index}`
                }
                className={`chat-message-row ${sender}`}
              >

                <div
                  className={`chat-bubble ${sender}`}
                >
                  {getMessageText(
                    message
                  )}

                  <small>
                    {formatTime(
                      message.createdAt
                    )}
                  </small>
                </div>

              </div>
            );
          }
        )}

        {sending && (
          <div className="chat-message-row ai">

            <div className="chat-bubble ai typing">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* ERROR */}

      {error && (
        <div className="chat-error">
          {error}
        </div>
      )}

      {/* AGENT STATUS */}

      {status ===
        "WAITING_FOR_AGENT" && (
        <div className="agent-waiting-box">

          <strong>
            Human agent requested
          </strong>

          <p>
            Your conversation is in the
            agent queue. An available travel
            expert will join shortly.
          </p>

        </div>
      )}

      {status ===
        "HUMAN_ACTIVE" && (
        <div className="human-active-box">
          👨‍💼 You are now chatting with
          a human travel agent.
        </div>
      )}

      {/* ACTION */}

      <div className="chat-actions">

        {(status === "AI_ACTIVE" ||
          !status) && (
          <button
            type="button"
            className="agent-request-button"
            onClick={handleRequestAgent}
            disabled={
              sending ||
              messages.length === 0
            }
          >
            👨‍💼 Talk to a human
          </button>
        )}

      </div>

      {/* INPUT */}

      <form
        className="chat-input-area"
        onSubmit={handleSend}
      >

        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder={
            status ===
              "WAITING_FOR_AGENT"
              ? "Waiting for an agent..."
              : status ===
                "HUMAN_ACTIVE"
              ? "Message your agent..."
              : "Ask me anything about travel..."
          }
          disabled={
            sending ||
            status ===
              "WAITING_FOR_AGENT"
          }
        />

        <button
          type="submit"
          disabled={
            sending ||
            !input.trim() ||
            status ===
              "WAITING_FOR_AGENT"
          }
        >
          {sending ? "..." : "Send"}
        </button>

      </form>

    </div>
  );
};


// ==========================================
// HELPERS
// ==========================================

const formatTime = (
  date
) => {
  if (!date) {
    return "";
  }

  try {
    return new Date(
      date
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const connectedStatusClass = (
  status
) => {
  if (
    status === "WAITING_FOR_AGENT"
  ) {
    return "status-waiting";
  }

  if (
    status === "HUMAN_ACTIVE"
  ) {
    return "status-human";
  }

  return "status-ai";
};

export default ChatWindow;