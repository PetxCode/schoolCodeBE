import express, { Application, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import db from "./utils/db";
import session from "express-session";
import { config } from "dotenv";

import school from "./router/schoolRouter";
import { use } from "bcrypt/promises";

config();
const proc: any = config().parsed;
const port = proc.LOCALPORT;

db;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    name: "sessionID",
    secret: "This is Safe",
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 4,
    },
  })
);

app.use("/api/school", school);

app.use("/", (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "This is the Home Page!",
  });
});

app.listen(port, () => {
  console.log("server is ready");
});
