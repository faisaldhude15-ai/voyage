import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    mode: {
      type: String,
      enum: ["ai", "human"],
      default: "ai",
    },

    status: {
      type: String,
      enum: [
        "AI_ACTIVE",
        "WAITING_FOR_AGENT",
        "ASSIGNED",
        "HUMAN_ACTIVE",
        "RESOLVED",
        "CLOSED",
      ],
      default: "AI_ACTIVE",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;