import { Request, Response } from "express";
import { retrieveRelevantChunks } from "../services/retrieval.service";
import { buildContext } from "../services/context-builder.service";
import { generateAnswer } from "../services/ollama.service";

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

    // Retrieve relevant chunks from MongoDB Vector Search
    const searchResults =
      await retrieveRelevantChunks(
        question
      );

    // Build context from retrieved chunks
    const context =
      buildContext(searchResults);

    // Generate final answer using Ollama
    const answer =
      await generateAnswer(
        context,
        question
      );

    res.status(200).json({
      success: true,
      answer,
      sources: searchResults.map(
        (chunk) => ({
          chunkId: chunk.chunkId,
          sourceDocument:
            chunk.sourceDocument,
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