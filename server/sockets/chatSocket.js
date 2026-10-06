import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const chatSocket = (io, socket) => {
  // ==========================================
  // JOIN CONVERSATION
  // ==========================================

  socket.on("joinConversation", async (conversationId) => {
    try {
      if (!conversationId) return;

      const room = `conversation:${conversationId}`;

      socket.join(room);

      console.log(
        `Socket ${socket.id} joined ${room}`
      );
    } catch (error) {
      console.error(
        "Join conversation error:",
        error.message
      );
    }
  });

  // ==========================================
  // LEAVE CONVERSATION
  // ==========================================

  socket.on("leaveConversation", (conversationId) => {
    try {
      if (!conversationId) return;

      const room = `conversation:${conversationId}`;

      socket.leave(room);

      console.log(
        `Socket ${socket.id} left ${room}`
      );
    } catch (error) {
      console.error(
        "Leave conversation error:",
        error.message
      );
    }
  });

  // ==========================================
  // CUSTOMER / AGENT TYPING
  // ==========================================

  socket.on(
    "typing",
    ({ conversationId, userId, senderType }) => {
      if (!conversationId) return;

      socket
        .to(`conversation:${conversationId}`)
        .emit("typing", {
          conversationId,
          userId,
          senderType,
        });
    }
  );

  // ==========================================
  // STOP TYPING
  // ==========================================

  socket.on(
    "stopTyping",
    ({ conversationId, userId, senderType }) => {
      if (!conversationId) return;

      socket
        .to(`conversation:${conversationId}`)
        .emit("stopTyping", {
          conversationId,
          userId,
          senderType,
        });
    }
  );

  // ==========================================
  // DISCONNECT
  // ==========================================

  socket.on("disconnect", () => {
    console.log(
      `Chat socket disconnected: ${socket.id}`
    );
  });
};

export default chatSocket;