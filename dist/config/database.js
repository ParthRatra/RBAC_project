"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dBconnect = void 0;
const mongoose = require("mongoose");
require("dotenv").config();
const dBconnect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {})
        .then(() => {
        console.log("Database connected successfully");
    })
        .catch((err) => {
        console.log("db connection issue");
        console.log(err);
        process.exit(1);
    });
};
exports.dBconnect = dBconnect;
