import { Request, Response } from "express";
import { extractPdfText } from "../services/pdf.service";
import { preprocessText } from "../services/preprocess.service";

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

