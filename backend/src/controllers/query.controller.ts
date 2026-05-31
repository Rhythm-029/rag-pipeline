import { Request, Response } from "express";
import { retrieveRelevantChunks } from "../services/retrieval.service";

export const askQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    const { question } = req.body;

    const chunks =
      await retrieveRelevantChunks(
        question
      );

    res.status(200).json({
      success: true,
      chunks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Query failed",
    });
  }
};