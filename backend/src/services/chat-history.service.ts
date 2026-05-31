import { Chat } from "../models/chat.model";

export const saveConversation = async (
  question: string,
  answer: string
) => {
  await Chat.create({
    question,
    answer,
  });
};

export const getRecentMessages =
  async (limit = 5) => {
    return await Chat.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  };