import User from "../models/User";

import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

exports.signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
   
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
        success: false,
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong while hashing password",
        success: false,
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        sucess: false,
        message:
          "Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }

    const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordregex.test(password)) {
      return res.status(400).json({
        msg:
          "Password must contain atleast 8 characters, one uppercase, one lowercase and one number",
        success: false,
      });
    }

    const newentry = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      msg: "User created successfully",
      success: true,
      data: newentry,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "User not created successfully, please try again",
    });
  }
};

exports.login= async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: "User does not exist, please signup first" });
    }

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role,
    };

    if (await bcrypt.compare(password, existingUser.password)) {


    let token;
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT secret key is not defined');
        }
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Something went wrong while signing the token',
            success: false,
        });
    }

    existingUser.token = token;
    existingUser.password = undefined as any;
   


      const options = {
       
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  
        httpOnly: true,
        
      };

   
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        existingUser,
        token,
      });
    }


    else{
        return res.status(400).json({
            success: false,
            message: "Password does not match",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
