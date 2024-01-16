import express from "express";

const router = express.Router();

const { signup, login } = require("../Controllers/Auth");
const{deleteuser} = require("../Controllers/Deleteuser");
import { Request, Response } from "express";
const { Getalluser } = require("../Controllers/Getuser");
const { Updatename } = require("../Controllers/Updatename");
const { updaterole } = require("../Controllers/updaterole");
const {resetpassword} = require("../Controllers/resetpassword");
const{resetpasswordToken} = require("../Controllers/resetpassword");
interface checkuser {
    id: string;
  email: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: checkuser; // Adjust the type according to your user structure
}

const { auth, isAdmin} = require("../middleware/auth");
router.post("/signup", signup);

router.post("/login", login);

// dashbaord page can be accessed by all the users
router.get("/dashboard", auth, (req, res) => {
  // all the users can access this page
  res.json({
    message: "welcome to dashboard",
  });
});

// statistics page can be accessed by only manager and admin
router.get("/statistics", auth, (req: AuthRequest, res: Response) => {
  if (req.user?.role == "manager" || req.user?.role == "admin") {
    res.json({
      message: "welcome to statistics",
    });
  } else {
    res.json({
      message: "you are not authorized to access this page",
    });
  }
});
// settings page can be accessed by only admin
router.get("/settings", auth, isAdmin);


// get all user and Admin can see all the user
router.get("/alluser", auth,isAdmin, Getalluser);




// update name can done by admin and manager

router.put("/updatename", auth, (req: AuthRequest, res: Response) => {
  const allowedRoles = ["admin", "manager"];
  if (allowedRoles.includes(req.user?.role as string)) {
    // If the user has the appropriate role, call the Updatename function
    return Updatename(req, res)
  } else {
    res.status(403).json({
      message: "You are not authorized to update the name",
    });
  }
});





// update role can be done by only admin

router.put("/updaterole", auth, isAdmin, (req: AuthRequest, res: Response) => {
  return updaterole(req, res);
});



// resetpassword token
router.post("/resetpasswordtoken",resetpasswordToken)


// reset password can be done by all the users here's auth middlware is not used beacuse there is no token for login so no authentication will be done
router.post("/resetpassword", resetpassword)

























// delete can be do by only admin
// we can do isAdmin aslo after auth but for more understanding i did like this
// /delete/:id  that's why in controllers we are using req.params.id
router.delete("/deleteuser", auth, isAdmin, deleteuser);








module.exports = router;
