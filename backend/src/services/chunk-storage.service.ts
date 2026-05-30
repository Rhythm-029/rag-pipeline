import { Chunk } from "../models/chunk.model";

export const saveChunks = async (
  chunks: any[]
) => {
  await Chunk.insertMany(chunks);
};