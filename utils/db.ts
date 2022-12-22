import mongoose from "mongoose";
import dotenv from "dotenv";

interface iData {
  LOCALBD: string;
}

const proc: any = dotenv.config().parsed;

const newURL = process.env.DB;
// const LOCALDB = proc.LOCALDB;
const LOCALDB = proc.ONLINEDB;
// const url = process.env.LOCALBD;

mongoose.connect(LOCALDB, () => {
  console.log("database is now connected...!");
});

export default mongoose;
