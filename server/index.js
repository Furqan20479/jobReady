import dotenv from "dotenv";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import products from "./api/productsApi.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRouter.route.js";

// Configurations

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// dir for EJS  (ECMA Script Module)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares

app.use(express.static(path.join(__dirname, "./public/images")));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//  Router Middleware
app.use(express.json());
app.use(userRouter);
app.use(express.urlencoded({ extended: true }));
// db connection middleware
import DBConnection from "./config/DB.js";
// DB Calling
DBConnection();

// Routes

app.get("/api", (req, res) => {
  res.json(products);
});
app.listen(port, () => {
  console.log(`Server is runnig on ${port}`);
});

// app.get("/", (req,res)=>{

//     res.send("Hello im the render function yo!");

// });

// app.get("/views", (req,res)=>{

//     res.render("home", {title : "Home_page"});
// });
