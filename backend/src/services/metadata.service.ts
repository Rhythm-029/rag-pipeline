export const createChunkMetadata = (
  chunks: string[],
  fileName: string
) => {
  return chunks.map((chunk, index) => ({
    chunkId: `${fileName}_chunk_${index + 1}`,
    sourceDocument: fileName,
    chunkIndex: index + 1,
    content: chunk,
    createdAt: new Date(),
  }));
};