import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { createAccessRefreshTokens } from "./user.controller.js";

const loginWithGoogle = asyncHandler(async (req, res) => {
  const { displayName, email, photoURL } = req.body;

  if ([displayName, email, photoURL].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const alreadyExistingUser = await User.findOne({ email });

  if (alreadyExistingUser) {
    const { _id, username, email, profilePic } = alreadyExistingUser;
    const { accessToken, refreshToken } = createAccessRefreshTokens(_id);
    const user = {
      _id,
      username,
      email,
      profilePic,
      accessToken,
      refreshToken,
    };
    res.status(200).json(new ApiResponse(200, user));
  }
  const generatedPassword = Math.random().toString(36).slice(-8) + "Aa@1";
  const profilePicCloudinary = await uploadToCloudinary(photoURL);

  const newUser = new User({
    username:
      displayName.split(" ").join("") +
      Math.floor(Math.random() * 1000000).toString(),
    email,
    profilePic: profilePicCloudinary,
    password: generatedPassword,
  });

  await newUser.save();

  const { _id, username, profilePic } = newUser;
  const { accessToken, refreshToken } = createAccessRefreshTokens(_id);
  const user = { _id, username, email, profilePic, accessToken, refreshToken };
  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .json(new ApiResponse(201, user));
});

export { loginWithGoogle };
