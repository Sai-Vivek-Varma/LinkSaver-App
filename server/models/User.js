import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be minimum 8 Characters"],
    },
  },
  { timestamps: true }
);

export const User = model("User", schema);
