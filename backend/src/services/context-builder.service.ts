export const buildContext = (
  chunks: any[]
) => {
  return chunks
    .map((chunk) => chunk.content)
    .join("\n\n");
};