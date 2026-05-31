import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  chunkId: String,
  sourceDocument: String,
  chunkIndex: Number,
  content: String,
  embedding: [Number],
  createdAt: Date,
});

export const Chunk = mongoose.model(
  "Chunk",
  chunkSchema
);