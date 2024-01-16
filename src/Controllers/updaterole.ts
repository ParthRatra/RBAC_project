import { Request, Response } from "express";
import User from "../models/User";

type AllowedRoles = "admin" | "manager" | "employee";
interface checkuser {
  email: string;
  role: AllowedRoles;
  id: number;
}

interface AuthRequest extends Request {
  user?: checkuser;
}

exports.updaterole = async (req: AuthRequest, res: Response) => {
  try {
    // because newrole is coming from the body
    const userRole = req.body.role;
    const id = req.user?.id;

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        msg: "user does not exist",
      });
    }

    currentUser.role = userRole as AllowedRoles;
    console.log(currentUser.role);

    await currentUser.save();

    res.status(200).json({
      success: true,
      data: currentUser.role,
      msg: "user role updated",
    },
    
    );
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "something went wrong while updating user",
    });
  }
};
