import { Request, Response } from "express";
import User from "../models/User";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";

exports.resetpasswordToken = async (req: Request, res: Response) => {
  // we don't have token that's why we are using req.body because middlware is not come in picture

  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: "user does not exist",
      });
    }

    // we are generating token
    const resetToken = crypto.randomBytes(32).toString("hex");
    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + 3600000;

    // Save the user with the reset token and expiration time
    await existingUser.save();

    res.status(200).json({
      success: true,
      data: existingUser.resetPasswordToken,
      msg: "Reset password token generated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.resetpassword = async (req:Request, res:Response) => {
    try {
      const { newPassword, resetPasswordToken } = req.body;
  
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(newPassword, 12);
      } catch (error) {
        return res.status(500).json({
          msg: "Something went wrong while hashing password",
          success: false,
        });
      }
  
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          success: false,
          message: "Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
        });
      }
  
      const user = await User.findOneAndUpdate(
        {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now() },
          // Check if the token is not expired and it should be greater than the current time
        },
        {
          password: hashedPassword,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
        { new: true } // This option ensures the updated document is returned
      );
  
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Invalid or expired reset token",
        });
      }
  
      res.status(200).json({
        success: true,
        msg: "Password reset successful",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
        success: false,
        message: "Some Error in Updating the Password",
      });
    }
  };
  