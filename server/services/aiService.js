const axios = require("axios");

const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_ID = process.env.MODEL_ID || "deepseek-ai/DeepSeek-V3.2-Exp:novita";

async function generateUserBio(name, role) {
  const prompt = `Write a professional bio for ${name}, a ${role}. 
Keep it to 2 sentences and under 400 characters.`;

  try {
    const response = await axios.post(
      HF_CHAT_URL,
      {
        model: MODEL_ID,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Hugging Face router returns OpenAI-style responses
    const generated = response.data?.choices?.[0]?.message?.content;

    return generated?.trim() || "Bio not available";
  } catch (error) {
    console.error(
      "Error generating bio from Hugging Face:",
      error.response?.data || error.message
    );
    return "Bio not available";
  }
}

module.exports = { generateUserBio };
