import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const WaitingChats = () => {
  const navigate = useNavigate();

  const [conversations, setConversations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [acceptingId, setAcceptingId] =
    useState(null);

  const loadWaitingChats = useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get("/agent/waiting");

        setConversations(
          response.data.conversations || []
        );
      } catch (error) {
        console.error(
          "Load waiting chats error:",
          error.response?.data ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadWaitingChats();
  }, [loadWaitingChats]);

  const acceptConversation = async (
    conversationId
  ) => {
    try {
      setAcceptingId(conversationId);

      await api.post(
        `/agent/accept/${conversationId}`
      );

      navigate(
        `/agent/active?conversation=${conversationId}`
      );
    } catch (error) {
      console.error(
        "Accept conversation error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to accept conversation."
      );
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <div className="agent-page">
      <header className="agent-page-header">
        <div>
          <h1>Waiting Chats</h1>

          <p>
            Customers waiting for a travel
            agent.
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

      <main className="agent-content">
        {loading ? (
          <div className="agent-loading">
            Loading waiting conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="empty-agent-card">
            <div className="empty-icon">
              ✓
            </div>

            <h2>No Waiting Chats</h2>

            <p>
              There are currently no customers
              waiting for an agent.
            </p>

            <button
              onClick={loadWaitingChats}
              className="refresh-btn"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="waiting-chat-list">
            {conversations.map(
              (conversation) => (
                <div
                  key={conversation._id}
                  className="waiting-chat-card"
                >
                  <div className="customer-avatar">
                    {conversation.customer?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "C"}
                  </div>

                  <div className="waiting-chat-info">
                    <h3>
                      {conversation.customer
                        ?.name ||
                        "Customer"}
                    </h3>

                    <p>
                      {conversation.customer
                        ?.email || ""}
                    </p>

                    <span className="waiting-status">
                      WAITING FOR AGENT
                    </span>
                  </div>

                  <button
                    className="accept-btn"
                    disabled={
                      acceptingId ===
                      conversation._id
                    }
                    onClick={() =>
                      acceptConversation(
                        conversation._id
                      )
                    }
                  >
                    {acceptingId ===
                    conversation._id
                      ? "Accepting..."
                      : "Accept Chat"}
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default WaitingChats;