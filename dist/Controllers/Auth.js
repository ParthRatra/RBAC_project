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
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists",
                success: false,
            });
        }
        let hashedPassword;
        try {
            hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        }
        catch (error) {
            return res.status(500).json({
                msg: "Something went wrong while hashing password",
                success: false,
            });
        }
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)) {
            return res.status(400).json({
                msg: "Please enter a valid email",
                success: false,
            });
        }
        const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordregex.test(password)) {
            return res.status(400).json({
                msg: "Password must contain atleast 8 characters, one uppercase, one lowercase and one number",
                success: false,
            });
        }
        const newentry = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        return res.status(201).json({
            msg: "User created successfully",
            success: true,
            data: newentry,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "User not created successfully, please try again",
        });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            return res
                .status(400)
                .json({ msg: "User does not exist, please signup first" });
        }
        const payload = {
            email: existingUser.email,
            id: existingUser._id,
            role: existingUser.role,
        };
        if (yield bcryptjs_1.default.compare(password, existingUser.password)) {
            let token;
            try {
                if (!process.env.JWT_SECRET_KEY) {
                    throw new Error('JWT secret key is not defined');
                }
                token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1d',
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: 'Something went wrong while signing the token',
                    success: false,
                });
            }
            existingUser.token = token;
            existingUser.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3000),
                httpOnly: true,
            };
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                existingUser,
                token,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password does not match",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "login failure",
        });
    }
});
