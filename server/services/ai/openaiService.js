import OpenAI from "openai";

import travelAgentPrompt from "./promptService.js";

// ==========================================
// GENERATE AI RESPONSE
// ==========================================

export const generateAIResponse = async (
  messages = []
) => {
  try {
    // Read environment variables when the function
    // is actually called, after dotenv.config()
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL;

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not configured in .env"
      );
    }

    if (!model) {
      throw new Error(
        "OPENAI_MODEL is not configured in .env"
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    console.log(
      `OpenAI request using model: ${model}`
    );

    const response =
      await openai.responses.create({
        model,
        instructions: travelAgentPrompt,

        input: messages.map((message) => ({
          role:
            message.senderType === "customer"
              ? "user"
              : "assistant",

          content: message.content,
        })),
      });

    return (
      response.output_text ||
      "Sorry, I could not generate a response right now."
    );
  } catch (error) {
    console.error(
      "OpenAI error:",
      error.message
    );

    throw new Error(
      "AI response could not be generated."
    );
  }
};