const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-pro";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const extractSingleWord = (text) => {
  if (!text || typeof text !== "string") return "N/A";
  return text.replace(/[^a-zA-Z]/g, " ").trim().split(/\s+/)[0] || "N/A";
};

const askAI = async (question) => {
  if (!GEMINI_API_KEY) {
    throw new Error("AI configuration missing");
  }

  const response = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: question }]
        }
      ]
    },
    {
      timeout: 10000
    }
  );

  const aiText =
    response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return extractSingleWord(aiText);
};

module.exports = { askAI };
