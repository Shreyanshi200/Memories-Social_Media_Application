import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
console.log(process.env.CONNECTION_URL);

mongoose.connect(process.env.CONNECTION_URL, {
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

