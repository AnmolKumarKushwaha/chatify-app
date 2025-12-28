import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";




export const signup = async (req, res) => {

    if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }
    const { fullName, email, password } = req.body;

    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        //check if email is valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }   

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "Email already exists" });
        }
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
         });    

        if(newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
         

            res.status(201).json({ 
                _id:newUser._id, 
                fullName: newUser.fullName,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });

            // send a welcome email here
            try {
                const clientURL = ENV.CLIENT_URL || "http://localhost:3000";
                await sendWelcomeEmail(newUser.email, newUser.fullName, clientURL);
            } catch (emailError) {
                console.error("Error sending welcome email:", emailError);
            }

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    // never tell the client which one is incorrect: password or email

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
