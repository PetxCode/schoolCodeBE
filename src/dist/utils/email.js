"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifiedTeacherMail = exports.verifiedSchoolMail = exports.resetMyPasswordTeacherMail = exports.resetMyPasswordSchoolMail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
// Phoenix
// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "1054310070984-bqesvn0ftgmhcn6p6292jskt91rk4n5e.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04dIMtDvNwamFCgYIARAAGAQSNwF-L9IrFJgJO7AzsDu8l4eJ0xQq5VcPSg9TL3sYVHufYPXj-inHC6ApFpP7hvl8goZR32Cd9TY";
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "799447380395-alt9pcrb7ghqanpem58i1eu02pmav3q8.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN = "1//044F8tb0v_GKRCgYIARAAGAQSNwF-L9IrcWa2WKL8VbF9TNdA8fD-YLZSJprNk1ufJf6AEUTzUIQWfCNdgTVSIFW04ZLLDecuf7w";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const url = "https://your-phoenix.web.app";
const resetMyPasswordSchoolMail = (school, myToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        const buildFile = path_1.default.join(__dirname, "./views/resetPassword.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: school.schoolName,
            id: school._id,
            school: school.schoolName,
            myToken,
            url,
        });
        const mailOptions = {
            from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
            to: school === null || school === void 0 ? void 0 : school.email,
            subject: "Reset Password",
            html: data,
        };
        transporter.sendMail(mailOptions);
    }
    catch (error) {
        return error;
    }
});
exports.resetMyPasswordSchoolMail = resetMyPasswordSchoolMail;
const resetMyPasswordTeacherMail = (teacher, myToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        const buildFile = path_1.default.join(__dirname, "./views/resetPasswordTeacher.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: teacher.name,
            id: teacher._id,
            school: teacher.schoolName,
            myToken,
            url,
        });
        const mailOptions = {
            from: "Phoenix Edu ❤❤❤ <phoenixedurebirth@gmail.com>",
            to: teacher === null || teacher === void 0 ? void 0 : teacher.email,
            subject: "Reset Password",
            html: data,
        };
        transporter.sendMail(mailOptions);
    }
    catch (error) {
        return error;
    }
});
exports.resetMyPasswordTeacherMail = resetMyPasswordTeacherMail;
const verifiedSchoolMail = (school) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        const buildFile = path_1.default.join(__dirname, "./views/AccountCreated.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            schoolName: school === null || school === void 0 ? void 0 : school.schoolName,
            email: school === null || school === void 0 ? void 0 : school.email,
            id: school === null || school === void 0 ? void 0 : school._id,
            status: school.status,
            schoolCode: school.schoolCode,
            url,
        });
        const mailOptions = {
            from: "Verification Account ❤❤❤ <phoenixedurebirth@gmail.com>",
            to: school.email,
            subject: "Account Verification",
            html: data,
        };
        transporter.sendMail(mailOptions);
    }
    catch (error) {
        return error;
    }
});
exports.verifiedSchoolMail = verifiedSchoolMail;
const verifiedTeacherMail = (teacher) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        const buildFile = path_1.default.join(__dirname, "./views/AccountCreatedTeacher.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: teacher.name,
            id: teacher === null || teacher === void 0 ? void 0 : teacher._id,
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
    }
    catch (error) {
        return error;
    }
});
exports.verifiedTeacherMail = verifiedTeacherMail;
// <body>
//   <container>
//     <row>
//       <columns small="12" >
//         <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
//           <div width="650px" height="250px" align="center" style="border-radius: 4px">
//            <img src="https://res.cloudinary.com/dxwae6kod/image/upload/v1677589329/download_tvwylk.png" width="250px" height="120px" style="padding-top:5px" alt="" border="0"/>
//           </div>
//           <tr>
//             <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello <%= schooName %>!</p>
//                 <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
//                 Congratulations!!!</b><br/>
//                 Thank you for coming on-board with school code", 
//                 <br/>Now you can track all activitives virtually that goes on in your school <br/>
//                 <strong style="color: red">Please follow the instruction to finish up!</strong>  </br>
//                 <br/>
//                 <br/>
//                 Use this Button below to get your school on track with <strong > <%= school %> virtual code</strong>!
//                 <div>
//                   <br/>
//                   <br/>
//                   <a 
//                     href="<%= url %>/api/school/verified/<%= id %>" 
//                   referrerpolicy="no-referrer" target="_blank" 
//                   style="text-decoration: none;
//                   padding: 20px 30px;
//                   color: white;
//                   margin-top: 50px;
//                   background-color: #000269;
//                   border-radius: 2px;
//                   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
//                   "
//                   >Activate <%= school %> </a>
//                 </div>
//                 <br />
//             </p></td>
//           </tr>
//         </table>
//       </columns>
//     </row>
// </container>
// </body>
