import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming user ID is available in req.user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherUserId = req.params.id;  
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: otherUserId },
        { sender: otherUserId, receiver: myId }
      ]
    }).sort({ createdAt: 1 });  

    res.status(200).json(messages);
  } catch (error) {     
    res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id; 
    const receiverId = req.params.id; 
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ message: "Message content cannot be empty." });
    }
    if(senderId.equals(receiverId)){
      return res.status(400).json({ message: "You cannot send messages to yourself." });
    }
    const receiverExists = await User.findById({_id: receiverId});
    if(!receiverExists){
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;
    if(image) {
       const uploadResult = await cloudinary.uploader.upload(image);
         imageUrl = uploadResult.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

    // todo: send the created message as response in real-time using socket.io;

    res.status(201).json(newMessage);

  }  catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  } 

};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find all the messages where the logged-in user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    });
    //extract unique user IDs from the messages
    const userIds = new Set();  
    messages.forEach(msg => {
      if (msg.senderId.toString() !== loggedInUserId.toString()) {
        userIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== loggedInUserId.toString()) {
        userIds.add(msg.receiverId.toString());
      }
    });
    //fetch user details for the unique user IDs
    const chatPartners = await User.find({ _id: { $in: Array.from(userIds) } }).select("-password");
    res.status(200).json(chatPartners);


    } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
    }
    
};