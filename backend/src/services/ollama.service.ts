import ollama from "ollama";

export const generateAnswer = async (
  context: string,
  question: string
) => {
  const response = await ollama.chat({
    model: "llama3.2",

    messages: [
      {
        role: "system",
        content: `
You are a helpful assistant.

Answer ONLY from the provided context.

If the answer is not found in the context,
say:

"I could not find that information in the documents."
`,
      },

      {
        role: "user",
        content: `
Context:

${context}

Question:

${question}
`,
      },
    ],
  });

  return response.message.content;
};