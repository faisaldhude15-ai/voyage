import express from "express";

import {
  sendMessage,
  getConversation,
  requestAgent,
  sendHumanMessage,
} from "../controllers/chatController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// AI CHAT
// ==========================================

router.post(
  "/",
  authMiddleware,
  sendMessage
);


// ==========================================
// REQUEST HUMAN AGENT
// IMPORTANT: BEFORE /:conversationId
// ==========================================

router.post(
  "/request-agent",
  authMiddleware,
  requestAgent
);


// ==========================================
// GET CONVERSATION
// ==========================================

router.get(
  "/:conversationId",
  authMiddleware,
  getConversation
);


// ==========================================
// HUMAN MESSAGE
// ==========================================

router.post(
  "/:conversationId/message",
  authMiddleware,
  sendHumanMessage
);

export default router;