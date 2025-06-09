import * as dotenv from "dotenv";
import mongoose from "mongoose";

//Filen som vi brugte de andre gange.

dotenv.config({ path: "./.env.local" });

if (!process.env.MONGODB_URI) {
  throw new Error("Sæt miljøvariablerne i .env.local.");
}

mongoose
  .connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });
