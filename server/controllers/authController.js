import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";

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

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  const { password: _, ...userResponse } = user.toObject();

  res.apiResponse(
    { user: userResponse, token },
    "User registered successfully",
    201
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.apiError("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.apiError("Email or Password is incorrect", 401);
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return res.apiError("Email or Password is incorrect", 401);
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  const { password: _, ...userResponse } = user.toObject();

  res.apiResponse(
    { user: userResponse, token },
    `Welcome back, ${user.name}`,
    200
  );
});

export const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.apiError("User not found", 401);
  }

  return res.apiResponse(user);
});
