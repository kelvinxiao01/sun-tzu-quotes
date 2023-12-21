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
    // const response = await axios.post(
    //   "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
    //   {
    //     prompt: message,
    //     max_tokens: 150,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );

    // res.json(response.data);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a quote muse. You write quotes in the style of Sun Tzu. You are very descriptive. You do not mention Sun Tzu in your quotes. Your quotes are 2 sentences long maximum.",
        },
        { role: "user", content: message },
        // {
        //   role: "assistant",
        //   content: "The Los Angeles Dodgers won the World Series in 2020.",
        // },
        // { role: "user", content: "Where was it played?" },
      ],
      model: "gpt-3.5-turbo",
    });

    var api_response = completion.choices[0].message.content;
    res.json(completion.choices[0].message.content);
    console.log(api_response);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send("Error processing your request");
  }
});
