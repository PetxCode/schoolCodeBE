import mongoose from "mongoose";
import dotenv from "dotenv";

interface iData {
  LOCALBD: string;
}

const proc: any = dotenv.config().parsed;

const newURL = process.env.DB;
const LOCALDB = proc.LOCALDB;
const url = process.env.LOCALBD;

mongoose.connect(LOCALDB, () => {
  console.log("database is now connected...!");
});

export default mongoose;
