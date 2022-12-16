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

interface iData {
  name?: {};
  email: string;
  password: string;
  image?: string;
  token?: string;
  verified?: boolean;
  superAdmin?: boolean;
  _id?: string;
}

export const verifiedUser = async (school) => {
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

    const data = await ejs.renderFile(buildFile, {
      name: school.name,
      id: school._id,
      school: school.name,
      url,
    });

    const mailOptions = {
      from: "SchoolCode ❤❤❤ <newstudentsportal2@gmail.com>",
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

export const resetMyPassword = async (school, myToken) => {
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
      name: school.name,
      id: school._id,
      school: school.name,
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

// export const verifiedByAdmin = async (generateToken: iData) => {
//   try {
//     const accessToken = await oAuth.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "ajwalletcoins@gmail.com",
//         refreshToken: accessToken.token,
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         accessToken: GOOGLE_REFRESHTOKEN,
//       },
//     });

//     const myTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "Gideonekeke64@gmail.com",
//         pass: "sgczftichnkcqksx",
//       },
//     });

//     const buildFile = path.join(__dirname, "../views/viewByAdmin.ejs");

//     const data = await ejs.renderFile(buildFile, {
//       name: generateToken?.fullName,
//       organisation: generateToken?.orgName,
//       id: generateToken?._id,
//       code: generateToken.voteCode,
//     });

//     const mailOptions = {
//       from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
//       to: generateToken?.orgEmail,
//       subject: "Please Verify this Account",
//       html: data,
//     };

//     myTransporter.sendMail(mailOptions, () => {
//       console.log("sent successfully");
//     });
//   } catch (error) {
//     return error;
//   }
// };

// export const verifiedByAdminFinally = async (generateToken: iData) => {
//   try {
//     const accessToken = await oAuth.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "ajwalletcoins@gmail.com",
//         refreshToken: accessToken.token,
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         accessToken: GOOGLE_REFRESHTOKEN,
//       },
//     });
//     const myTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "Gideonekeke64@gmail.com",
//         pass: "sgczftichnkcqksx",
//       },
//     });

//     console.log("userData: ", generateToken);

//     const buildFile = path.join(__dirname, "../views/voterCode.ejs");

//     const data = await ejs.renderFile(buildFile, {
//       name: generateToken?.fullName,
//       organisation: generateToken?.orgName,
//       id: generateToken?._id,
//       code: generateToken.voteCode,
//     });

//     const mailOptions = {
//       from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
//       to: generateToken?.orgEmail,
//       subject: `${generateToken?.fullName}'s Account has been Verify`,
//       html: data,
//     };

//     myTransporter.sendMail(mailOptions, () => {
//       console.log("sent successfully");
//     });
//   } catch (error) {
//     return error;
//   }
// };

// export const verifiedSignUser = async (findUser: iData) => {
//   try {
//     const accessToken = await oAuth.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "ajwalletcoins@gmail.com",
//         refreshToken: accessToken.token,
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         accessToken: GOOGLE_REFRESHTOKEN,
//       },
//     });

//     const myTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "Gideonekeke64@gmail.com",
//         pass: "sgczftichnkcqksx",
//       },
//     });

//     const buildFile = path.join(__dirname, "../views/signinAccount.ejs");

//     const data = await ejs.renderFile(buildFile, {
//       name: findUser?.fullName,
//       id: findUser?._id,
//       myToken: findUser?.token,
//     });

//     const mailOptions = {
//       from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
//       to: findUser?.email,
//       subject: "Account re-Verification",
//       html: data,
//     };

//     myTransporter.sendMail(mailOptions, () => {
//       console.log("sent successfully");
//     });
//   } catch (error) {
//     return error;
//   }
// };

// export const acceptance = async (
//   email: string,
//   positioned: iData,
//   fullName: string
// ) => {
//   try {
//     console.log("position from email: ", positioned?.position);

//     const accessToken = await oAuth.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "ajwalletcoins@gmail.com",
//         refreshToken: accessToken.token,
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         accessToken: GOOGLE_REFRESHTOKEN,
//       },
//     });

//     const myTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "Gideonekeke64@gmail.com",
//         pass: "sgczftichnkcqksx",
//       },
//     });
//     const buildFile = path.join(__dirname, "../views/Acceptance.ejs");

//     const data = await ejs.renderFile(buildFile, {
//       name: positioned?.fullName,
//       position: positioned?.position,
//       email: email,
//     });

//     const mailOptions = {
//       from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
//       to: email,
//       subject: `Acceptance for the Position of ${positioned?.position}`,
//       html: data,
//     };

//     myTransporter.sendMail(mailOptions, () => {
//       console.log("sent successfully");
//     });
//   } catch (error) {
//     return error;
//   }
// };
