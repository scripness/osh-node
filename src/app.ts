import express from "express";
import dotenv from "dotenv";

import { router } from "./routes";

dotenv.config();

export const app = express();

app.use("/api", router);
