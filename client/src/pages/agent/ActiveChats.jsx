import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import api from "../../services/api";

const ActiveChats = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const selectedConversation =
    searchParams.get("conversation");

  const [conversations, setConversations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const loadConversations =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/agent/conversations"
          );

        setConversations(
          response.data.conversations || []
        );
      } catch (error) {
        console.error(
          "Load agent conversations error:",
          error.response?.data ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const sendMessage = async () => {
    if (
      !selectedConversation ||
      !message.trim()
    ) {
      return;
    }

    try {
      setSending(true);

      await api.post(
        `/agent/conversation/${selectedConversation}/message`,
        {
          message: message.trim(),
        }
      );

      setMessage("");

      await loadConversations();
    } catch (error) {
      console.error(
        "Send agent message error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  const resolveConversation =
    async () => {
      if (!selectedConversation) {
        return;
      }

      try {
        await api.post(
          `/agent/conversation/${selectedConversation}/resolve`
        );

        await loadConversations();

        navigate("/agent/active");
      } catch (error) {
        console.error(
          "Resolve conversation error:",
          error.response?.data ||
            error.message
        );

        alert(
          error.response?.data?.message ||
            "Failed to resolve conversation."
        );
      }
    };

  return (
    <div className="agent-page">
      <header className="agent-page-header">
        <div>
          <h1>Active Chats</h1>

          <p>
            Manage your active customer
            conversations.
          </p>
        </div>

        <button
          className="agent-back-btn"
          onClick={() =>
            navigate("/agent")
          }
        >
          ← Dashboard
        </button>
      </header>

      <main className="active-chat-layout">
        <aside className="active-conversations">
          <div className="active-sidebar-title">
            <h2>My Conversations</h2>

            <button
              onClick={loadConversations}
              className="small-refresh-btn"
            >
              ↻
            </button>
          </div>

          {loading ? (
            <p className="sidebar-message">
              Loading...
            </p>
          ) : conversations.length ===
            0 ? (
            <p className="sidebar-message">
              No active conversations.
            </p>
          ) : (
            conversations.map(
              (conversation) => (
                <button
                  key={conversation._id}
                  className={`conversation-list-item ${
                    selectedConversation ===
                    conversation._id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/agent/active?conversation=${conversation._id}`
                    )
                  }
                >
                  <div className="list-avatar">
                    {conversation.customer?.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "C"}
                  </div>

                  <div>
                    <strong>
                      {conversation.customer
                        ?.name ||
                        "Customer"}
                    </strong>

                    <span>
                      {
                        conversation.status
                      }
                    </span>
                  </div>
                </button>
              )
            )
          )}
        </aside>

        <section className="agent-chat-panel">
          {!selectedConversation ? (
            <div className="select-chat-message">
              <div>💬</div>

              <h2>
                Select a conversation
              </h2>

              <p>
                Choose a customer from the
                left panel to start chatting.
              </p>
            </div>
          ) : (
            <>
              <div className="agent-chat-header">
                <div>
                  <h2>
                    Customer Conversation
                  </h2>

                  <span>
                    HUMAN ACTIVE
                  </span>
                </div>

                <button
                  className="resolve-btn"
                  onClick={
                    resolveConversation
                  }
                >
                  Resolve
                </button>
              </div>

              <div className="agent-chat-messages">
                <div className="agent-message customer">
                  <span>
                    Customer messages will
                    appear here through
                    Socket.IO.
                  </span>
                </div>
              </div>

              <div className="agent-chat-input">
                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  placeholder="Type your message..."
                  rows="2"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                <button
                  onClick={sendMessage}
                  disabled={
                    sending ||
                    !message.trim()
                  }
                >
                  {sending
                    ? "Sending..."
                    : "Send"}
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ActiveChats;