import MessageModel from "../models/MessageModel.js";
import ChatModel from "../models/ChatModel.js";
import User from "../models/usersModel.js";
import { LlmResponse } from "../LlmModel/Gemini.js"; 

export const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req?.body;

    // Check if the receiver is 'BUSY'
    const chat = await ChatModel.findById(chatId);
    const receiverId = chat.members.find(memberId => memberId.toString() !== senderId.toString());
    const receiver = await User.findById(receiverId);

    let messageText = text;

    if (receiver.status === 'BUSY') {
      try {
        // Generate response using LlmResponse function
        const generatedResponse = await LlmResponse(text);
        messageText = generatedResponse;
      } catch (error) {
        console.error("Error generating response:", error);
        // If there's an error generating the response, send a default message
        messageText = "Sorry, I'm currently unavailable.";
      }
    }

    const message = new MessageModel({
      chatId,
      senderId,
      text: messageText,
    });

    const result = await message.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const chatId = req?.params?.chatId;
    const messages = await MessageModel.find({ chatId });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
