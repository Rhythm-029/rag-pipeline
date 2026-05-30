import { Request, Response } from "express";
import { extractPdfText } from "../services/pdf.service";
import { preprocessText } from "../services/preprocess.service";
import { createChunks } from "../services/chunk.service";
import { createChunkMetadata } from "../services/metadata.service";
import { saveChunks } from "../services/chunk-storage.service";

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

    const extractedText = await extractPdfText(
  req.file.path
);

const cleanText = preprocessText(
  extractedText
);


const chunks =
  createChunks(cleanText);
const chunkMetadata = createChunkMetadata(
  chunks,
  req.file.originalname
);
await saveChunks(chunkMetadata);
console.log(chunkMetadata[0]);

console.log(
  "Total Chunks:",
  chunks.length
);

console.log(
  chunks[0]
);

console.log(
  cleanText.substring(0, 500)
);

    res.status(200).json({
      success: true,
      file: req.file.originalname,
      extractedChars: extractedText.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error processing PDF",
    });
  }
};

