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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchoolTeacher = exports.changePassword = exports.resetPassword = exports.verifiedSchool = exports.loginSchool = exports.createSchool = exports.updateSchool = exports.getSchool = exports.getSchools = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const email_1 = require("../utils/email");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const proc = (0, dotenv_1.config)().parsed;
const getSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield schoolModel_1.default.find();
        return res.status(200).json({
            message: "found",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getSchools = getSchools;
const getSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield schoolModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "school found",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getSchool = getSchool;
const updateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let streamUpload = (req) => {
        //   return new Promise(async (resolve, reject) => {
        //     let stream = await cloudinary.uploader.upload_stream(
        //       (error, result) => {
        //         if (result) {
        //           console.log("result: ", result);
        //           console.log("show");
        //           return resolve(result);
        //         } else {
        //           return reject(error);
        //         }
        //       }
        //     );
        //     streamifier.createReadStream(req?.file!.buffer).pipe(stream);
        //   });
        // };
        // const image: any = await streamUpload(req);
        const image = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        const user = yield schoolModel_1.default.findByIdAndUpdate(req.params.id, { logo: image.secure_url }, { new: true });
        return res.status(200).json({
            message: "school found",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateSchool = updateSchool;
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const token = jsonwebtoken_1.default.sign({ hash }, proc.SECRET);
        const school = yield schoolModel_1.default.create({
            schoolName,
            email,
            password: hash,
            token,
        });
        (0, email_1.verifiedSchoolMail)(school)
            .then((result) => {
            console.log("message been sent to you: ");
        })
            .catch((error) => console.log(error));
        return res.status(200).json({
            message: "school found",
            data: school,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.createSchool = createSchool;
const loginSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.session);
        const school = yield schoolModel_1.default.findOne({ email });
        if (school) {
            if (school.verified) {
                const passCheck = yield bcrypt_1.default.compare(password, school.password);
                const token = jsonwebtoken_1.default.sign({ id: school._id }, proc.SECRET);
                // req!.session!.sessionID = school._id;
                if (passCheck) {
                    const _a = school._doc, { password } = _a, info = __rest(_a, ["password"]);
                    return res.status(200).json({
                        message: "school found",
                        data: Object.assign(Object.assign({}, info), { token }),
                    });
                }
                else {
                    return res.status(404).json({ message: "password is not correct" });
                }
            }
            else {
                return res
                    .status(404)
                    .json({ message: "school has not yet been verified" });
            }
        }
        else {
            return res.status(404).json({ message: "school cannot be found" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.loginSchool = loginSchool;
const verifiedSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        if (school) {
            if (!school.verified && school.token !== "") {
                const code = crypto_1.default.randomBytes(2).toString("hex");
                const school = yield schoolModel_1.default.findByIdAndUpdate(req.params.id, {
                    verified: true,
                    token: "",
                    schoolCode: code,
                }, { new: true });
                return res.status(200).json({
                    message: "You have been verified, you can now Sign in",
                    data: school,
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "school has not yet been verified" });
            }
        }
        else {
            return res.status(404).json({ message: "school cannot be found" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.verifiedSchool = verifiedSchool;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log("Got it");
        const school = yield schoolModel_1.default.findOne({ email });
        if (school) {
            if ((school === null || school === void 0 ? void 0 : school.verified) && (school === null || school === void 0 ? void 0 : school.token) === "") {
                const token = crypto_1.default.randomBytes(5).toString("hex");
                const myToken = jsonwebtoken_1.default.sign({ token }, "thisIsHome");
                yield schoolModel_1.default.findByIdAndUpdate(school._id, { token: myToken }, { new: true });
                (0, email_1.resetMyPasswordSchoolMail)(school, myToken)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(200).json({
                    message: "Please check your email to continue",
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "You do not have enough right to do this!" });
            }
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `An Error Occur: ${error} ` });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const school = yield schoolModel_1.default.findById(req.params.id);
        if (school) {
            if (school.verified && school.token === req.params.token) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, salt);
                yield schoolModel_1.default.findByIdAndUpdate(school._id, {
                    token: "",
                    password: hashed,
                }, { new: true });
            }
        }
        else {
            return res.status(404).json({ message: "operation can't be done" });
        }
        return res.status(200).json({
            message: "password has been changed",
        });
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
});
exports.changePassword = changePassword;
const getSchoolTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield schoolModel_1.default
            .findById(req.params.id)
            .populate({ path: "teachers", options: { sort: { createdAt: -1 } } });
        return res.status(200).json({
            message: "Here are your Teachers",
            data: teachers,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.getSchoolTeacher = getSchoolTeacher;
