import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DB;
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`);

try {
  await sequelize.authenticate();
  console.log('Conexão com o PostgreSQL realizada com sucesso.');
} catch (error) {
  console.error('Erro a conectar-se com o PostgreSQL:', error);
}

export default sequelize;