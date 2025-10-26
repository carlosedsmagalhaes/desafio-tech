import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();
const user = new userController();

userRouter.get("/user", user.findAll);
userRouter.post("/user/login", user.login);
userRouter.post("/user", user.create);
userRouter.put("/user/:id", user.update);
userRouter.delete("/user/:id", user.delete);

export default userRouter;
