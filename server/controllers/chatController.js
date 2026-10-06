import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

import {
  generateAIResponse,
} from "../services/ai/openaiService.js";


// ==========================================
// SEND MESSAGE TO AI
// ==========================================

export const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required.",
      });
    }

    let conversation;

    // Find existing conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        customer: req.user._id,
      });

      if (!conversation) {
        return res.status(404).json({
          message: "Conversation not found.",
        });
      }
    }

    // Create new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        customer: req.user._id,
        mode: "ai",
        status: "AI_ACTIVE",
        lastMessageAt: new Date(),
      });
    }

    // Human mode check
    if (
      conversation.mode === "human" ||
      conversation.status === "HUMAN_ACTIVE" ||
      conversation.status === "ASSIGNED"
    ) {
      return res.status(400).json({
        message:
          "This conversation is currently being handled by a human agent.",
      });
    }

    // Save customer message
    await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      senderType: "customer",
      content: message.trim(),
    });

    // Get conversation history
    const previousMessages = await Message.find({
      conversation: conversation._id,
    })
      .sort({ createdAt: 1 })
      .limit(30);

    // Generate AI response
    const aiReply = await generateAIResponse(
      previousMessages
    );

    // Save AI message
    await Message.create({
      conversation: conversation._id,
      sender: null,
      senderType: "ai",
      content: aiReply,
    });

    // Update conversation
    conversation.lastMessageAt = new Date();
    conversation.status = "AI_ACTIVE";
    conversation.mode = "ai";

    await conversation.save();

    return res.status(200).json({
      message: "AI response generated successfully.",
      conversationId: conversation._id,
      reply: aiReply,
    });
  } catch (error) {
    console.error(
      "Send message error:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to send message.",
      error: error.message,
    });
  }
};


// ==========================================
// GET CONVERSATION
// ==========================================

export const getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        customer: req.user._id,
      })
        .populate(
          "customer",
          "name email avatar role"
        )
        .populate(
          "agent",
          "name email avatar role"
        );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    const messages = await Message.find({
      conversation: conversation._id,
    })
      .populate(
        "sender",
        "name email avatar role"
      )
      .sort({ createdAt: 1 });

    return res.status(200).json({
      conversation,
      messages,
    });
  } catch (error) {
    console.error(
      "Get conversation error:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to load conversation.",
      error: error.message,
    });
  }
};


// ==========================================
// REQUEST HUMAN AGENT
// ==========================================

export const requestAgent = async (req, res) => {
  try {
    const { conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).json({
        message: "Conversation ID is required.",
      });
    }

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        customer: req.user._id,
      });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    if (
      conversation.status === "HUMAN_ACTIVE" ||
      conversation.status === "ASSIGNED"
    ) {
      return res.status(400).json({
        message:
          "A human agent is already handling this conversation.",
      });
    }

    if (
      conversation.status === "WAITING_FOR_AGENT"
    ) {
      return res.status(400).json({
        message:
          "Your conversation is already waiting for an agent.",
      });
    }

    conversation.mode = "human";
    conversation.status = "WAITING_FOR_AGENT";
    conversation.agent = null;
    conversation.lastMessageAt = new Date();

    await conversation.save();

    return res.status(200).json({
      message:
        "Human agent requested successfully.",
      conversationId: conversation._id,
      status: conversation.status,
    });
  } catch (error) {
    console.error(
      "Request agent error:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to request human agent.",
      error: error.message,
    });
  }
};


// ==========================================
// SEND HUMAN MESSAGE
// ==========================================

export const sendHumanMessage = async (
  req,
  res
) => {
  try {
    const { conversationId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required.",
      });
    }

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        customer: req.user._id,
      });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    if (
      conversation.status !== "HUMAN_ACTIVE" &&
      conversation.status !== "ASSIGNED"
    ) {
      return res.status(400).json({
        message:
          "A human agent is not currently active.",
      });
    }

    const newMessage = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      senderType: "customer",
      content: message.trim(),
    });

    conversation.lastMessageAt = new Date();

    await conversation.save();

    const populatedMessage =
      await Message.findById(
        newMessage._id
      ).populate(
        "sender",
        "name email avatar role"
      );

    return res.status(200).json({
      message: "Message sent successfully.",
      data: populatedMessage,
    });
  } catch (error) {
    console.error(
      "Human message error:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to send message.",
      error: error.message,
    });
  }
};