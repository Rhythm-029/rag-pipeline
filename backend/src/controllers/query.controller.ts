import { Request, Response } from "express";
import { retrieveRelevantChunks } from "../services/retrieval.service";
import { buildContext } from "../services/context-builder.service";
import { generateAnswer } from "../services/ollama.service";
import {
  saveConversation,
  getRecentMessages,
} from "../services/chat-history.service";

export const askQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Get previous chat history
    const previousMessages =
      await getRecentMessages();

    const conversationHistory =
      previousMessages
        .reverse()
        .map(
          (msg) =>
            `User: ${msg.question}\nAI: ${msg.answer}`
        )
        .join("\n\n");

    // Retrieve relevant chunks
    const searchResults =
      await retrieveRelevantChunks(
        question
      );

    // Build RAG context
    const ragContext =
      buildContext(searchResults);

    // Combine chat history + retrieved chunks
    const context = `
Previous Conversation:

${conversationHistory}

Relevant Documents:

${ragContext}
`;

    // Generate answer
    const answer =
      await generateAnswer(
        context,
        question
      );

    // Save conversation
    await saveConversation(
      question,
      answer
    );

    res.status(200).json({
      success: true,
      answer,

      sources: searchResults.map(
        (chunk) => ({
          chunkId: chunk.chunkId,

          sourceDocument:
            chunk.sourceDocument,

          score: Number(
            chunk.score
          ).toFixed(3),
        })
      ),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Query failed",
    });
  }
};