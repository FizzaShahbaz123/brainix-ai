import {
  GoogleGenerativeAI,
  HarmCategory,
} from "@google/generative-ai"

const MODEL_NAME = "gemini-2.5-pro";
const API_KEY = "AIzaSyC4UUDVufSnYH-KcFxGd5s74MqrGzRhJ2o";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    }, {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    }, {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    }, {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    histroy: [
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
}

export default runChat();
