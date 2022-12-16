import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

const proc: any = config().parsed;

cloudinary.config({
  cloud_name: proc.CLOUD_NAME,
  api_key: proc.CLOUD_KEY,
  api_secret: proc.CLOUD_SECRET,
});

export default cloudinary;
