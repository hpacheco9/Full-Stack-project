import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.js";
import bodyParser from "body-parser";

// Configure environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Start express app
const app = express();

// Configure body parser
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
