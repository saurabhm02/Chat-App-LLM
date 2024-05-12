import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
export const LlmResponse = async (prompt) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    try {
      // Create a promise that resolves when the LLM response is received
      const responsePromise = model.generateContent(prompt);
  
      // Create a promise that rejects after 10 seconds
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('LLM API response timed out'));
        }, 10000); // 10 seconds timeout
      });
  
      // Use Promise.race to wait for either the LLM response or timeout
      const result = await Promise.race([responsePromise, timeoutPromise]);
  
      // Check if the result is from the LLM response or timeout
      if (result.response) {
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text;
      } else {
        // If the timeoutPromise rejects, indicate that the user is unavailable
        console.log('LLM API response timed out');
        return "Sorry, the user is currently unavailable.";
      }
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
};