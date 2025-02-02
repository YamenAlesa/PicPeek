const Message = require("../models/messagesModels");
const User = require("../models/userModels");

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Ensure that sender and receiver are valid
    if (!sender || !receiver || !message) {
      return res.status(400).json({ error: "Sender, receiver, and message are required." });
    }

    // Fetch sender details
    const senderUser = await User.findById(sender);
    if (!senderUser) {
      return res.status(404).json({ error: "Sender not found" });
    }

    // Create a new message document
    const newMessage = new Message({
      sender,
      receiver,
      message,
      senderName: senderUser.name, // Include sender's name
    });

    // Save the new message to the database
    await newMessage.save();

    // Respond with the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error); // Log the error for debugging
    res.status(500).json({ error: "Message sending failed" });
  }
};

// chatController.js
exports.sendMessage = async (req, res) => {
  // Handle sending message
};

exports.getMessages = async (req, res) => {
  // Handle retrieving messages
};
