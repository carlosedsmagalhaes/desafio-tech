import { Router } from "express";
import saleController from "../controllers/sale.js";

const saleRouter = Router();
const sale = new saleController();

saleRouter.get("/sale", sale.findAll);
saleRouter.get("/sale/:id", sale.findById);
saleRouter.post("/sale", sale.create);
saleRouter.put("/sale/:id", sale.update);
saleRouter.delete("/sale/:id", sale.delete);

export default saleRouter;
