import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "admin",
    },

    token: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
        type: Number,
    },
  },

  { timestamps: true }
);

export default mongoose.model("user", User);
