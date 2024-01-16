import User from "../models/User";
import { Request, Response } from "express";

exports.Getalluser = async (req: Request, res: Response) => {
  try {
    const alluser = await User.find({});

    

    res.status(200).json({
      success: true,
      data: alluser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: "Something went wrong while getting all user",
    });
  }
};

