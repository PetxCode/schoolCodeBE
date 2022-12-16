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
      //   secure: true,
      maxAge: 1000 * 60 * 1,
    },
  })
);

app.use("/api/school", school);

const protect = (req, res, next) => {
  if (!req.session.sessionID) {
    app.use("/out", (req: Request, res: Response): Response => {
      return res.status(200).json({
        message: "Get Out!",
      });
    });
  } else {
    return next();
  }
};

const protectedData = (req, res, next) => {
  if (!req.session.sessionID) {
    return res.status(200).json({
      message: "Get Out!",
    });
  } else {
    return next();
  }
};

// app.use("/", (req: Request, res: Response): Response => {
//   console.log(req.session);
//   return res.status(200).json({
//     message: "This is the Home Page!",
//   });
// });

app.listen(port, () => {
  console.log("server is ready");
});
