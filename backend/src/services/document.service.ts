import { Chunk } from "../models/chunk.model";

export const documentExists = async (
  fileName: string
) => {
  const existing = await Chunk.findOne({
    sourceDocument: fileName,
  });

  return !!existing;
};

export const deleteDocumentChunks = async (
  fileName: string
) => {
  await Chunk.deleteMany({
    sourceDocument: fileName,
  });
};