import * as dotenv from "dotenv";
dotenv.config();

import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// import { join, path } from "path";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = Express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
  {
    // origin:["https://"],
    methods:["POST","GET"],
    credentials:true
  }
));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);



const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("hello");
  res.redirect("/posts");
});

mongoose.connect(process.env.CONNECTION_URL).then(() =>
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  })
);