import { Router } from "express";
import clientController from "../controllers/client.js";

const clientRouter = Router();
const client = new clientController();

clientRouter.get("/client", client.findAll);
clientRouter.get("/client/:id", client.findById);
clientRouter.post("/client", client.create);
clientRouter.put("/client/:id", client.update);
clientRouter.delete("/client/:id", client.delete);

export default clientRouter;
