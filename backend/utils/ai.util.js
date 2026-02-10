const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const extractSingleWord = (text) => {
  if (!text || typeof text !== "string") return "N/A";
  return text.replace(/[^a-zA-Z]/g, " ").trim().split(/\s+/)[0] || "N/A";
};

const askAI = async (question) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: question }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        },
        timeout: 10000
      }
    );

    const aiText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return extractSingleWord(aiText);

  } catch (err) {
    if (err.response?.status === 429) {
      throw new Error("AI_RATE_LIMIT");
    }
    throw new Error("AI_FAILED");
  }
};

module.exports = { askAI };
