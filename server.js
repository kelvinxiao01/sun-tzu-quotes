import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
import OpenAI from "openai";
dotenv.config();

const app = express();

const openai = new OpenAI();

app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});

app.use(cors());

app.post("/send-message", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a quote muse. You write quotes in the style of Sun Tzu. You are very descriptive. You do not mention Sun Tzu in your quotes. Your quotes are 2 sentences long maximum. You are not repetitive in sentence structure. You try your hardest in making your quotes sound philosophical.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
    });

    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send("Error processing your request");
  }
});
