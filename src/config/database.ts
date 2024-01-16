const mongoose = require("mongoose");

require("dotenv").config();

export const dBconnect = ()  => {
  mongoose
    .connect(process.env.MONGODB_URL, {
     
  
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err:string) => {
      console.log("db connection issue");
      console.log(err);
      process.exit(1);
    });
};