import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url: string = "http:localhost:2244";

export const resetMyPasswordSchoolMail = async (school, myToken) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
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

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");
    console.log(school.token);
    const data = await ejs.renderFile(buildFile, {
      name: school.schoolName,
      id: school._id,
      school: school.schoolName,
      myToken,
      url,
    });

    const mailOptions = {
      from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
      to: school?.email,
      subject: "Reset Password",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const resetMyPasswordTeacherMail = async (teacher, myToken) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
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

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
      to: teacher?.email,
      subject: "Reset Password",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const verifiedSchoolMail = async (school) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
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

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });
    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");
    console.log(school);

    const data = await ejs.renderFile(buildFile, {
      schooName: school.schoolName,
      id: school?._id,
      school: school.schoolName,
      url,
    });

    console.log(school.email);
    console.log("ajwalletcoins@gmail.com");

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: school.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const verifiedTeacherMail = async (teacher) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
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

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
      },
    });
    const buildFile = path.join(
      __dirname,
      "../views/AccountCreatedTeacher.ejs"
    );
    console.log(teacher);

    const data = await ejs.renderFile(buildFile, {
      name: teacher.name,
      id: teacher?._id,
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

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};
