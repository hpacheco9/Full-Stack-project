import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.js";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./src/routes/auth.js";
import MySQLStore from "express-mysql-session";
import { options, syncDatabase } from "./src/services/database.js";

// Configure environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Sync database
syncDatabase();

// Start express app
const app = express();

// Serve static files
app.use(express.static("public"));

// Configure template engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", async (req, res) => {
  res.render("registo");
});

// Configure session
const DBSessionStore = MySQLStore(session);
const sessionStore = new DBSessionStore(options);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
