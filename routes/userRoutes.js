import { Router } from "express";
import {
  loadHomePage,
  signUpTheUser,
  logInTheUser,
} from "../controllers/userController.js";
import { verifyIt } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/home", verifyIt, loadHomePage);
userRouter.get("/login", (req, res) => res.render("login"));
userRouter.post("/login", logInTheUser);
userRouter.get("/signup", (req, res) => res.render("signup"));
userRouter.post("/signup", signUpTheUser);

export default userRouter;
