import { Chunk } from "../models/chunk.model";
import { generateEmbedding } from "./embedding.service";

export const retrieveRelevantChunks = async (
  query: string
) => {
  const queryEmbedding =
    await generateEmbedding(query);

  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: 5,
      },
    },
    {
       $project: {
    _id: 0,
    chunkId: 1,
    sourceDocument: 1,
    content: 1,
    score: {
      $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return results;
};