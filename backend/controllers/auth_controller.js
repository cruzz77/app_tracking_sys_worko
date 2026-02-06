import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({success: false,message: "Missing Details"});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({success: false,message: "Invalid Email"});
    }

    if (password.length < 6) {
      return res.status(400).json({success: false,message: "Password too short"});
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({success: false,message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success: false,message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({success: false,message: "Invalid credentials"});
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    res.json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
    registerUser, 
    loginUser, 
    getProfile
};