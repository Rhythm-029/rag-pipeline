import ollama from "ollama";

export const generateEmbedding = async (
  text: string
) => {
  const response = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: text,
  });

  return response.embedding;
};