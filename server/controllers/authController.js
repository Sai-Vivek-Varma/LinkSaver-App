import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.apiError("All fields are required", 400);
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.apiError("User with this email already exists", 400);
  }

  user = await User.create({
    name,
    email,
    password,
  });

  res.apiResponse(user, "User registered successfully", 201);
});
