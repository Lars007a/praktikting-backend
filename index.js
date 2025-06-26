import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectDB } from "./dbConnect.js";
import router from "./routes/routes.js";
import { requiredUser, loadUserFromToken } from "./mdlwr/auth.js";

dotenv.config({ path: "./.env.local" }); //Tilføjer den til alle dine miljøvariabler, når du køre .config med en path til filen med dine nye miljøvariabler du ville have tilføjet.

await connectDB();

const server = express();

server.use(cors());

server.use(express.json()); //brug json.

server.use(loadUserFromToken);

server.use("/uploads", express.static("uploadsDir")); //Ha uploadsDir mappen blive accessible på /uploads url'et.

//Setup routes her.
server.use(router);

server.listen(process.env.SERVER_PORT, (error) => {
  if (error) {
    console.log("Skete en fejl, kunne ikke starte serveren...");
    return;
  }

  console.log(
    `Startede serveren på port ${process.env.SERVER_PORT}. Kan indsætte data med npm run setup.`
  );
});
