import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = mongoose.model(
  "Chat",
  chatSchema
);