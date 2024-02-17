import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// generate access and refresh tokens
const createAccessRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false,
  });

  return { accessToken, refreshToken };
};

// cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true,
};

// register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Please fill in all fields");
  }

  // validation for email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // validation for password length
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  // already existing user
  const alreadyExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (alreadyExistingUser) {
    throw new ApiError(400, "User already exists");
  }

  const profilePicLocalPath = req.file?.path;

  console.log(profilePicLocalPath);
  if (!profilePicLocalPath) {
    throw new ApiError(400, "Please upload a profile picture");
  }

  const profilePicCloudinary = await uploadToCloudinary(profilePicLocalPath);

  if (!profilePicCloudinary) {
    throw new ApiError(500, "Profile picture upload failed");
  }

  const user = await User.create({
    username,
    email,
    password,
    profilePic: profilePicCloudinary,
  });

  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "User not created");
  }

  res.status(201).json(new ApiResponse(201, userCreated));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid credentials. Please Sign Up");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } = await createAccessRefreshTokens(
    user._id
  );

  const userLoggedIn = await User.findByIdAndUpdate(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: userLoggedIn,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
