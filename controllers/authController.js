import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../modules/userModel.js";

import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer } = req.body;
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({
        success: false,
        error: "All fields are required",
      });
    }

    // check if user already exists
    const user = await userModel.findOne({ email });

    // existing user
    if (user) {
      return res.status(200).send({
        success: false,
        error: "User already exists",
      });
    }

    // register new user

    // hash password
    const hashedPassword = await hashPassword(password);

    // save
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    });

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Register Error",
      error: err.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        error: "All fields are required",
      });
    }

    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "Email does not exist",
      });
    }

    console.log(user)

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
        success: true,
        message: "Login successful",
        user:{
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        },
        token
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Login Error",
      error: err.message,
    });
  }
};

// test Controller
export const testContorller = (req, res) => {
  res.send("Protected Route");
}

// forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    
    const {email, answer, newPassword} = req.body;
    if(!email || !answer || !newPassword){
      return res.status(404).send({
        success: false,
        error: "All fields are required",
      });
    }

    // check user

    const user = await userModel.findOne({email, answer});

    // valid user
    if(!user){
      return res.status(404).send({
        success: false,
        error: "Invalid email or answer",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password: hashedPassword});

    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}