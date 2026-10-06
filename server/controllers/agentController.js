import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

// ==========================================
// GET WAITING CONVERSATIONS
// ==========================================

export const getWaitingConversations = async (
  req,
  res
) => {
  try {
    const conversations =
      await Conversation.find({
        status: "WAITING_FOR_AGENT",
      })
        .populate(
          "customer",
          "name email avatar"
        )
        .sort({
          lastMessageAt: 1,
        });

    return res.status(200).json({
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error(
      "Get waiting conversations error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to get waiting conversations.",
      error: error.message,
    });
  }
};

// ==========================================
// ACCEPT CONVERSATION
// ==========================================

export const acceptConversation = async (
  req,
  res
) => {
  try {
    const { conversationId } = req.params;

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        status: "WAITING_FOR_AGENT",
      });

    if (!conversation) {
      return res.status(404).json({
        message:
          "Waiting conversation not found.",
      });
    }

    conversation.agent = req.user._id;
    conversation.mode = "human";
    conversation.status = "HUMAN_ACTIVE";
    conversation.lastMessageAt = new Date();

    await conversation.save();

    const updatedConversation =
      await Conversation.findById(
        conversation._id
      )
        .populate(
          "customer",
          "name email avatar role"
        )
        .populate(
          "agent",
          "name email avatar role"
        );

    return res.status(200).json({
      message:
        "Conversation accepted successfully.",
      conversation:
        updatedConversation,
    });
  } catch (error) {
    console.error(
      "Accept conversation error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to accept conversation.",
      error: error.message,
    });
  }
};

// ==========================================
// GET AGENT CONVERSATIONS
// ==========================================

export const getAgentConversations = async (
  req,
  res
) => {
  try {
    const conversations =
      await Conversation.find({
        agent: req.user._id,
        status: {
          $in: [
            "ASSIGNED",
            "HUMAN_ACTIVE",
            "RESOLVED",
          ],
        },
      })
        .populate(
          "customer",
          "name email avatar"
        )
        .populate(
          "agent",
          "name email avatar"
        )
        .sort({
          lastMessageAt: -1,
        });

    return res.status(200).json({
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error(
      "Get agent conversations error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to get agent conversations.",
      error: error.message,
    });
  }
};

// ==========================================
// SEND AGENT MESSAGE
// ==========================================

export const sendAgentMessage = async (
  req,
  res
) => {
  try {
    const { conversationId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message:
          "Message is required.",
      });
    }

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        agent: req.user._id,
        status: "HUMAN_ACTIVE",
      });

    if (!conversation) {
      return res.status(404).json({
        message:
          "Active conversation not found.",
      });
    }

    const newMessage =
      await Message.create({
        conversation:
          conversation._id,

        sender: req.user._id,

        senderType: "agent",

        content: message.trim(),
      });

    conversation.lastMessageAt =
      new Date();

    await conversation.save();

    const populatedMessage =
      await Message.findById(
        newMessage._id
      ).populate(
        "sender",
        "name email avatar role"
      );

    return res.status(200).json({
      message:
        "Agent message sent successfully.",
      data: populatedMessage,
    });
  } catch (error) {
    console.error(
      "Send agent message error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to send agent message.",
      error: error.message,
    });
  }
};

// ==========================================
// RESOLVE CONVERSATION
// ==========================================

export const resolveConversation = async (
  req,
  res
) => {
  try {
    const { conversationId } = req.params;

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        agent: req.user._id,
        status: "HUMAN_ACTIVE",
      });

    if (!conversation) {
      return res.status(404).json({
        message:
          "Active conversation not found.",
      });
    }

    conversation.status = "RESOLVED";
    conversation.lastMessageAt =
      new Date();

    await conversation.save();

    return res.status(200).json({
      message:
        "Conversation resolved successfully.",
      conversation,
    });
  } catch (error) {
    console.error(
      "Resolve conversation error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to resolve conversation.",
      error: error.message,
    });
  }
};