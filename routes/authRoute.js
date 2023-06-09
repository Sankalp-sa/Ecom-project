import express from "express";
import { registerController, loginController, testContorller } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


// router object
const router = express.Router();

//router

// register || method: POST
router.post("/register", registerController);

// LOGIN || method: POST
router.post("/login", loginController);

router.get("/test", requireSignIn , isAdmin, testContorller);

// Protected route auth 
router.get("/user-auth", requireSignIn, (req, res) => {
    
    res.status(200).send({ok: true});
});




export default router;