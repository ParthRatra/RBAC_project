import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
// import { ParamsDictionary } from "express-serve-static-core";
// import User from "../models/User";

dotenv.config();


interface checkuser{
  id:string,
  email:string,
  role:string
}


interface AuthRequest extends Request {
  user?: checkuser; // Adjust the type according to your user structure
}

exports.auth= async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token =
      req.body?.token ||
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        msg: "No token, authorization denied",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as checkuser;
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        msg: "Token is not valid",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong while validating the token",
    });
  }
};

exports.isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({
        success: false,
        msg: "This is the protected route for Admin only",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong while validating the token",
    });
  }
};

exports.isManager  = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "manager") {
      return res.status(401).json({
        success: false,
        msg: "This is the protected route for manager only",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong while validating the token",
    });
  }
};

exports.isEmployee = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "employee") {
      return res.status(401).json({
        success: false,
        msg: "This is the protected route for employee only",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong while validating the token",
    });
  }
};


