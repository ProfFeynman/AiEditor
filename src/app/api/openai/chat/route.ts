/**
 * OpenAI Chat API Route
 * 
 * This API route handles chat completions using OpenAI's GPT-4 model.
 * It uses the Vercel AI SDK for streaming responses and handles message conversion.
 * 
 * Features:
 * - Edge runtime for optimal performance
 * - Streaming responses using Server-Sent Events
 * - Message format conversion for OpenAI's API
 * 
 * Required Environment Variables:
 * - OPENAI_API_KEY: Your OpenAI API key
 * 
 * @route POST /api/openai/chat
 */

import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

// Use edge runtime for better performance with streaming
export const runtime = "edge";

/**
 * POST handler for chat completions
 * 
 * @param {Request} req - The incoming request object
 * @returns {Response} A streaming response with the chat completion
 */
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4"),
    messages: convertToCoreMessages(messages),
    system: "You are a helpful AI assistant",
  });

  return result.toDataStreamResponse();
}
