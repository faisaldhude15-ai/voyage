import {
  useCallback,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import { useSocket } from "../context/SocketContext";

const useChat = (conversationId = null) => {
  const { socket } = useSocket();

  const [conversation, setConversation] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const [status, setStatus] =
    useState("AI_ACTIVE");

  // ==========================================
  // LOAD CONVERSATION
  // ==========================================

  const loadConversation = useCallback(
    async (id) => {
      if (!id) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/chat/${id}`
        );

        const data = response.data;

        setConversation(
          data.conversation || data
        );

        setMessages(
          data.messages ||
            data.conversation?.messages ||
            []
        );

        setStatus(
          data.conversation?.status ||
            data.status ||
            "AI_ACTIVE"
        );
      } catch (err) {
        console.error(
          "Load conversation error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Unable to load conversation."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==========================================
  // SOCKET JOIN
  // ==========================================

  useEffect(() => {
    if (!socket || !conversationId) {
      return;
    }

    socket.emit(
      "joinConversation",
      conversationId
    );

    console.log(
      "Joined conversation:",
      conversationId
    );

    return () => {
      socket.emit(
        "leaveConversation",
        conversationId
      );
    };
  }, [socket, conversationId]);

  // ==========================================
  // SOCKET NEW MESSAGE
  // ==========================================

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewMessage = (message) => {
      setMessages((previous) => {
        const exists = previous.some(
          (item) =>
            item._id &&
            message._id &&
            item._id === message._id
        );

        if (exists) {
          return previous;
        }

        return [...previous, message];
      });
    };

    const handleStatusChange = (data) => {
      const newStatus =
        data?.status || data;

      if (newStatus) {
        setStatus(newStatus);

        setConversation((previous) =>
          previous
            ? {
                ...previous,
                status: newStatus,
              }
            : previous
        );
      }
    };

    socket.on(
      "newMessage",
      handleNewMessage
    );

    socket.on(
      "conversationStatus",
      handleStatusChange
    );

    return () => {
      socket.off(
        "newMessage",
        handleNewMessage
      );

      socket.off(
        "conversationStatus",
        handleStatusChange
      );
    };
  }, [socket]);

  // ==========================================
  // SEND AI MESSAGE
  // ==========================================

  const sendMessage = async (message) => {
    const trimmedMessage =
      message?.trim();

    if (!trimmedMessage) {
      return null;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        "/chat",
        {
          message: trimmedMessage,
          conversationId:
            conversationId ||
            localStorage.getItem(
              "conversationId"
            ) ||
            null,
        }
      );

      const data = response.data;

      if (data.conversationId) {
        localStorage.setItem(
          "conversationId",
          data.conversationId
        );
      }

      if (data.reply) {
        const aiMessage = {
          _id:
            `ai-${Date.now()}-${Math.random()}`,
          senderType: "ai",
          sender: "ai",
          role: "assistant",
          content: data.reply,
          message: data.reply,
          createdAt: new Date().toISOString(),
        };

        setMessages((previous) => [
          ...previous,
          aiMessage,
        ]);
      }

      if (data.conversationId) {
        await loadConversation(
          data.conversationId
        );
      }

      return data;
    } catch (err) {
      console.error(
        "Send message error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to send message."
      );

      throw err;
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // REQUEST HUMAN AGENT
  // ==========================================

  const requestAgent = async () => {
    const id =
      conversationId ||
      localStorage.getItem(
        "conversationId"
      );

    if (!id) {
      setError(
        "Please send a message first."
      );

      return null;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        "/chat/request-agent",
        {
          conversationId: id,
        }
      );

      const data = response.data;

      setStatus(
        data.status ||
          "WAITING_FOR_AGENT"
      );

      setConversation((previous) =>
        previous
          ? {
              ...previous,
              status:
                data.status ||
                "WAITING_FOR_AGENT",
            }
          : previous
      );

      return data;
    } catch (err) {
      console.error(
        "Request agent error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to request human agent."
      );

      throw err;
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // SEND HUMAN MESSAGE
  // ==========================================

  const sendHumanMessage = async (
    message
  ) => {
    const trimmedMessage =
      message?.trim();

    const id =
      conversationId ||
      localStorage.getItem(
        "conversationId"
      );

    if (!trimmedMessage || !id) {
      return null;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        `/chat/${id}/message`,
        {
          message: trimmedMessage,
        }
      );

      const data = response.data;

      if (data.message) {
        setMessages((previous) => [
          ...previous,
          data.message,
        ]);
      }

      return data;
    } catch (err) {
      console.error(
        "Human message error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to send message."
      );

      throw err;
    } finally {
      setSending(false);
    }
  };

  return {
    conversation,
    messages,
    loading,
    sending,
    error,
    status,

    loadConversation,
    sendMessage,
    requestAgent,
    sendHumanMessage,

    clearError: () => setError(""),
  };
};

export default useChat;