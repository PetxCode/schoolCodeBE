"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifiedTeacherMail =
  exports.verifiedSchoolMail =
  exports.resetMyPasswordTeacherMail =
  exports.resetMyPasswordSchoolMail =
    void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
// const url: string = "http:localhost:2244";
// const url: string = "https://school-code.onrender.com/";
const url = "https://schoolcode-project.web.app";
const resetMyPasswordSchoolMail = (school, myToken) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const accessToken = yield oAuth.getAccessToken();
      const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ajwalletcoins@gmail.com",
          refreshToken: accessToken.token,
          clientId: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          accessToken: GOOGLE_REFRESHTOKEN,
        },
      });
      const myTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          user: "Gideonekeke64@gmail.com",
          pass: "sgczftichnkcqksx",
        },
      });
      const buildFile = path_1.default.join(
        __dirname,
        "../views/resetPassword.ejs"
      );
      const data = yield ejs_1.default.renderFile(buildFile, {
        name: school.schoolName,
        id: school._id,
        school: school.schoolName,
        myToken,
        url,
      });
      const mailOptions = {
        from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
        to: school === null || school === void 0 ? void 0 : school.email,
        subject: "Reset Password",
        html: data,
      };
      transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  });
exports.resetMyPasswordSchoolMail = resetMyPasswordSchoolMail;
const resetMyPasswordTeacherMail = (teacher, myToken) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const accessToken = yield oAuth.getAccessToken();
      const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ajwalletcoins@gmail.com",
          refreshToken: accessToken.token,
          clientId: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          accessToken: GOOGLE_REFRESHTOKEN,
        },
      });
      const myTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          user: "Gideonekeke64@gmail.com",
          pass: "sgczftichnkcqksx",
        },
      });
      const buildFile = path_1.default.join(
        __dirname,
        "../views/resetPasswordTeacher.ejs"
      );
      const data = yield ejs_1.default.renderFile(buildFile, {
        name: teacher.name,
        id: teacher._id,
        school: teacher.schoolName,
        myToken,
        url,
      });
      const mailOptions = {
        from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
        to: teacher === null || teacher === void 0 ? void 0 : teacher.email,
        subject: "Reset Password",
        html: data,
      };
      transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  });
exports.resetMyPasswordTeacherMail = resetMyPasswordTeacherMail;
const verifiedSchoolMail = (school) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const accessToken = yield oAuth.getAccessToken();
      const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ajwalletcoins@gmail.com",
          refreshToken: accessToken.token,
          clientId: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          accessToken: GOOGLE_REFRESHTOKEN,
        },
      });
      const myTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          user: "Gideonekeke64@gmail.com",
          pass: "sgczftichnkcqksx",
        },
      });
      const buildFile = path_1.default.join(
        __dirname,
        "../views/AccountCreated.ejs"
      );
      const data = yield ejs_1.default.renderFile(buildFile, {
        schooName: school.schoolName,
        id: school === null || school === void 0 ? void 0 : school._id,
        school: school.schoolName,
        url,
      });
      const mailOptions = {
        from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
        to: school.email,
        subject: "Account Verification",
        html: data,
      };
      transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  });
exports.verifiedSchoolMail = verifiedSchoolMail;
const verifiedTeacherMail = (teacher) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const accessToken = yield oAuth.getAccessToken();
      const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ajwalletcoins@gmail.com",
          refreshToken: accessToken.token,
          clientId: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          accessToken: GOOGLE_REFRESHTOKEN,
        },
      });
      const myTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
          user: "Gideonekeke64@gmail.com",
          pass: "sgczftichnkcqksx",
        },
      });
      const buildFile = path_1.default.join(
        __dirname,
        "../views/AccountCreatedTeacher.ejs"
      );
      const data = yield ejs_1.default.renderFile(buildFile, {
        name: teacher.name,
        id: teacher === null || teacher === void 0 ? void 0 : teacher._id,
        school: teacher.schoolName,
        schoolName: teacher.schoolName,
        url,
      });
      const mailOptions = {
        from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
        to: teacher.email,
        subject: "Account Verification",
        html: data,
      };
      transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  });
exports.verifiedTeacherMail = verifiedTeacherMail;
