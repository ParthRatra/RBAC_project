import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import { dBconnect } from "./config/database";
import dotenv from "dotenv";

const auth = require("./routes/auth");

dotenv.config();

const app = express();
dBconnect();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan("dev"));

app.use("/root/api/v1", auth);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

app.use(
  (
    err: createHttpError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    err.status = err.status || 500;
    res.status(err.status).send(err.message);
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
