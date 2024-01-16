import express from "express"
import User from "../models/User";
import { Request, Response } from "express";

interface checkuser{
   
    email:string,
    role:string,
    id:number
}


interface AuthRequest extends Request {
    user?: checkuser; 
   
  }


  exports.Updatename = async (req: AuthRequest, res: Response) => {
    try {
        // name is not there in the payload of jwt token

        const { name } = req.body;
       

        const id = req.user?.id;

        const currentUser = await User.findById(id );

        if(!currentUser){
            return res.status(400).json({
                success:false,
                msg:"user does not exist"
            })
        }

        currentUser.name = name;

        await currentUser.save();

        res.status(200).json({
            success:true,
            data:currentUser,
            msg:"user updated"
        })

       

  
      
  
    }

    catch(err){
        res.status(400).json({
            success:false,
            msg:"something went wrong while updating user"
        })
    }
  };
  
  