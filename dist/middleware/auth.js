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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        // extract jwt token
        const token = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.replace('Bearer ', ''));
        // if token is not present
        if (!token) {
            return res.status(401).json({
                msg: "No token, authorization denied"
            });
        }
        // verify token
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
        finally {
        }
    }
    catch (err) {
        console.log(err);
    }
});
