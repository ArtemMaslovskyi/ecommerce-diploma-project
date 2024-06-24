const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs");
const { User } = require("../models/user");
const { HttpsError, ctrlWrapper, emailSender } = require("../error_handler");
const { nanoid } = require("nanoid");
const { BASE_URL, SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const generateAccessToken = (username, userId) => {
  console.log("generateAccessToken", username, userId, SECRET_KEY);
  return jwt.sign({ userId, username }, SECRET_KEY, { expiresIn: 60 * 60 });
};

const verifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };
  emailSender(verifyEmail);
};

const register = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const avatarURL = gravatar.url(req.body.email);
    const verificationToken = nanoid();
    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    await newUser.save();

    const token = generateAccessToken(newUser.name, newUser._id);
    await User.findByIdAndUpdate(newUser._id, { token });
    return res.status(200).json({
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const getCurrent = async (req, res) => {
  const { email, name, _id } = req.body;
  res.json({
    email,
    name,
    _id,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateAccessToken(user.name, user._id);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const emailVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpsError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const reVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpsError(404, "User not found");
  }

  if (user.verify) {
    throw HttpsError(401, "Verification has already been passed");
  }

  const verificationToken = nanoid();
  await User.findByIdAndUpdate(user._id, { verificationToken });

  verifyEmail(email, verificationToken);

  res.json({
    message: "Verification email sent",
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  try {
    fs.renameSync(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  emailVerification: ctrlWrapper(emailVerification),
  reVerify: ctrlWrapper(reVerify),
};
