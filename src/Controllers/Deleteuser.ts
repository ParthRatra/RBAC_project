import User from "../models/User";
import { Request, Response } from "express";

interface checkuser{
    name:string,
    email:string,
    role:string,
    id:number
}

interface AuthRequest extends Request {
    user?: checkuser; 
  
  }

exports.deleteuser = async (req: AuthRequest, res: Response) => {

    try{

        // /delete/:id  that's why in controllers we are using req.params.id
        // const id = req.params.id;

       const id = req.user?.id ;
        
        console.log(id);


        const currentUser = await User.findById({ _id: id });

        console.log(currentUser);

        if (!currentUser) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist, please signup first",
            });
        }

        await currentUser.deleteOne();

        res.status(200).json({
            success:true,
            msg:"user deleted"
        })




    }
    catch{
        res.status(400).json({
            success:false,
            msg:"something went wrong while deleting user"
        })

    }


}