"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
const auth = require("./routes/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, database_1.dBconnect)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/root/api/v1", auth);
app.get("/", (req, res, next) => {
    res.send("Hello World");
});
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).send(err.message);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
