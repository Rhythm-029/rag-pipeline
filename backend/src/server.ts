import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);

app.get("/", (_req, res) => {
  res.status(200).send("PullUp RAG Backend Running");
});

app.listen(8000, "0.0.0.0", () => {
  console.log("Server running on port 8000");
});

app.get("/docs", (req, res) => {
  res.send("Docs Route Working");
});

app.get("/upload-test", (_req, res) => {
  res.send(`
    <form action="/api/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="document" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.get("/upload-test", (_req, res) => {
  res.send(`
    <form action="/api/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="document" />
      <button type="submit">Upload</button>
    </form>
  `);
});