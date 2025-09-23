// index.js
import express from "express";
import { Client } from "pg";
import { ChatOpenAI } from "@langchain/openai";


const app = express();
const PORT = 3000;

// Connect to Postgres
const db = new Client({
  connectionString: process.env.DATABASE_URL,
});
await db.connect();

// Create a LangChain model wrapper
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Define a simple route
app.get("/", async (req, res) => {
  const response = await model.call([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, who are you?" }
  ]);
  res.send(response.content);
});

app.listen(PORT, () => {
  console.log(`🚀 Chatbot running at http://localhost:${PORT}`);
});
