import express from "express";

import {
  getWaitingConversations,
  acceptConversation,
  getAgentConversations,
  sendAgentMessage,
  resolveConversation,
} from "../controllers/agentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import agentMiddleware from "../middleware/agentMiddleware.js";

const router = express.Router();

// ==========================================
// WAITING CONVERSATIONS
// ==========================================

router.get(
  "/waiting",
  authMiddleware,
  agentMiddleware,
  getWaitingConversations
);

// ==========================================
// ACCEPT CONVERSATION
// ==========================================

router.post(
  "/accept/:conversationId",
  authMiddleware,
  agentMiddleware,
  acceptConversation
);

// ==========================================
// AGENT CONVERSATIONS
// ==========================================

router.get(
  "/conversations",
  authMiddleware,
  agentMiddleware,
  getAgentConversations
);

// ==========================================
// AGENT MESSAGE
// ==========================================

router.post(
  "/conversation/:conversationId/message",
  authMiddleware,
  agentMiddleware,
  sendAgentMessage
);

// ==========================================
// RESOLVE
// ==========================================

router.post(
  "/conversation/:conversationId/resolve",
  authMiddleware,
  agentMiddleware,
  resolveConversation
);

export default router;