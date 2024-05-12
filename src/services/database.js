import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

// Establish connection to the database using .env credentials
const { DB, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export async function syncDatabase() {
  await User.sync();
}

export const options = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
};
