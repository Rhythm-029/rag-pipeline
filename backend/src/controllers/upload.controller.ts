import { Request, Response } from "express";
import { extractPdfText } from "../services/pdf.service";
import { preprocessText } from "../services/preprocess.service";
import { createChunks } from "../services/chunk.service";
import { createChunkMetadata } from "../services/metadata.service";
import { saveChunks } from "../services/chunk-storage.service";
import { generateEmbedding } from "../services/embedding.service";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.file);

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    // Extract text from PDF
    const extractedText = await extractPdfText(
      req.file.path
    );

    // Clean text
    const cleanText = preprocessText(
      extractedText
    );

    // Create chunks
    const chunks = createChunks(
      cleanText
    );

    // Create metadata
    const chunkMetadata =
      createChunkMetadata(
        chunks,
        req.file.originalname
      );

    // Generate embeddings for all chunks
    const chunksWithEmbeddings =
      await Promise.all(
        chunkMetadata.map(
          async (chunk) => ({
            ...chunk,
            embedding:
              await generateEmbedding(
                chunk.content
              ),
          })
        )
      );

    // Save to MongoDB
    await saveChunks(
      chunksWithEmbeddings
    );

    console.log(
      "Total Chunks:",
      chunks.length
    );

    console.log(
      "Embedding Dimensions:",
      chunksWithEmbeddings[0]
        ?.embedding.length
    );

    console.log(
      "First Chunk:"
    );

    console.log(
      chunksWithEmbeddings[0]
    );

    res.status(200).json({
      success: true,
      file: req.file.originalname,
      totalChunks: chunks.length,
      extractedChars:
        extractedText.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Error processing PDF",
    });
  }
};