import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "799447380395-e19a21lgg2hb02tlt70mmshbp1m6fd8q.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04jmkbCCBuKVjCgYIARAAGAQSNwF-L9IrLtvs325fZrBkGmDtO89bwkL8oCh_ne5wg0R3BVrCSNrhMUe8Z9E2hKRbQ21rcp5Ls0Q";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url: string = "https://schoolcode-project.web.app";

export const resetMyPasswordSchoolMail = async (school: any, myToken: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "phoenixedurebirth@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");
    const data = await ejs.renderFile(buildFile, {
      name: school.schoolName,
      id: school._id,
      school: school.schoolName,
      myToken,
      url,
    });

    const mailOptions = {
      from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
      to: school?.email,
      subject: "Reset Password",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export const resetMyPasswordTeacherMail = async (
  teacher: any,
  myToken: any,
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "phoenixedurebirth@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPasswordTeacher.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: teacher.name,
      id: teacher._id,
      school: teacher.schoolName,
      myToken,
      url,
    });

    const mailOptions = {
      from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
      to: teacher?.email,
      subject: "Reset Password",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export const verifiedSchoolMail = async (school: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "phoenixedurebirth@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");

    const data = await ejs.renderFile(buildFile, {
      schooName: school.schoolName,
      id: school?._id,
      school: school.schoolName,
      url,
    });

    const mailOptions = {
      from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
      to: school.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export const verifiedTeacherMail = async (teacher: any) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "phoenixedurebirth@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(
      __dirname,
      "../views/AccountCreatedTeacher.ejs",
    );

    const data = await ejs.renderFile(buildFile, {
      name: teacher.name,
      id: teacher?._id,
      school: teacher.schoolName,
      schoolName: teacher.schoolName,
      url,
    });

    const mailOptions = {
      from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
      to: teacher.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};
