// import { Request } from "express";
// import multer from "multer";
// import path from "path";

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

// const storage = multer.diskStorage({
//   destination: function (req: Request, file: any, cb: DestinationCallback) {
//     cb(null, "uploads");
//   },
//   filename: function (req: Request, file: any, cb: FileNameCallback) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       ~file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// //File Validation

// export const upload = multer({
//   storage: storage,
//   // limit: 1000 * 2,
// }).single("image");

import { Request } from "express";
import multer from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: DestinationCallback) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req: Request, file: any, cb: FileNameCallback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

export default upload;

// : Express.Multer.File,
