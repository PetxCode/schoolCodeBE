import express, { Application, Response, Request } from "express";
import cors from "cors";
import db from "./utils/db";
import { config } from "dotenv";

import school from "./router/schoolRouter";
import teacher from "./router/teacherRouter";
import classes from "./router/classRouter";
import viewTest from "./router/testRouter";
import performance from "./router/performanceRouter";
import attendance from "./router/attendanceRouter";
import student from "./router/studentRouter";
import academic from "./router/academicSessionRouter";
import schoolfee from "./router/schoolFeeRouter";
import announcement from "./router/notificationRouter";
import event from "./router/eventRouter";

config();
const proc: any = config().parsed;
const port = proc.LOCALPORT;

db;

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/school", school);
app.use("/api/teacher", teacher);
app.use("/api/class", classes);
app.use("/api/test", viewTest);
app.use("/api/performance", performance);
app.use("/api/attendance", attendance);
app.use("/api/student", student);
app.use("/api/academic", academic);
app.use("/api/schoolfee", schoolfee);
app.use("/api/announcement", announcement);
app.use("/api/event", event);

// app.use("/", (req: Request, res: Response): Response => {
//   return res.status(200).json({
//     message: "This is the Home Page!",
//   });
// });

app.listen(process.env.PORT || port, () => {
  console.log("server is ready");
});

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     name: "sessionID",
//     secret: "This is Safe",
//     cookie: {
//       secure: true,
//       maxAge: 1000 * 60 * 1,
//     },
//   })
// );

// const protectedData = (req: any, res: any, next: any) => {
//   if (!req.session.sessionID) {
//     return res.status(200).json({
//       message: "Get Out!",
//     });
//   } else {
//     return next();
//   }
// };
// import { google } from "googleapis";
// import googleOAuth from "passport-google-oauth20";
// import passport from "passport";
// import schoolModel from "./model/schoolModel";

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// const GoogleStrategy = googleOAuth.Strategy;

// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
// const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

// const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

// oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

// const url: string = "http:localhost:2244";
// const accessToken = oAuth.getAccessToken();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_SECRET,
//       callbackURL: "http://localhost:2244/auth/google/callback",
//       // callbackURL: GOOGLE_REDIRECT,
//     },
//     // function ({ accessToken, refreshToken: GOOGLE_REFRESHTOKEN, profile, cb }) {
//     //   schoolModel.create({ googleId: profile.id }, function (err, user) {
//     //     return cb(err, user);
//     //   });
//     // }
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       schoolModel.create(
//         {
//           // _id: user,
//           name: profile.displayName,
//           email: profile.emails[0].email,
//           logo: profile.photos[0].value,
//         },
//         function (err, user) {
//           console.log(user);
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/auth/google" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.status(200).json({ message: "Welcome back home" });
//     // res.redirect("/");
//   }
// );

// const protect = (req: any, res: any, next: any) => {
//   if (!req.session.sessionID) {
//     app.use("/out", (req: Request, res: Response): Response => {
//       return res.status(200).json({
//         message: "Get Out!",
//       });
//     });
//   } else {
//     return next();
//   }
// };
