import fs from "fs";
import pdfParse from "pdf-parse";

export const extractPdfText = async (
  filePath: string
): Promise<string> => {
  const dataBuffer = fs.readFileSync(filePath);

  const pdfData = await pdfParse(dataBuffer);

  return pdfData.text;
};