import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import db from "./db.js";
import userRouter from './routes/user.js';
import clientRouter from './routes/client.js';
import saleRouter from './routes/sale.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', clientRouter);
app.use('/api', saleRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname, "../public/index.html");
});

db.sync();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
