import User from "../../../models/User.model";
import dbConnect from "../../../server-utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import generateAuthToken from "../../../middleware/generateAuthToken.middleware";

export default async (req, res) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    // @route   GET api/auth
    // @desc    Fetch all admin users
    // @access  Public
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Server error, please try again later",
        });
      }
      break;

    // @route   POST api/auth
    // @desc    Authenticate user & get token
    // @access  Public
    case "POST":
      try {
        const { email, password } = req.body;

        const user = await User.findOne({
          email: email.toLowerCase(),
        }).select("+password");
        if (!user) {
          return res.status(400).json({
            success: false,
            msg: "Invalid credentials",
          });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
          return res.status(400).json({
            success: false,
            msg: "Invalid credentials",
          });
        }

        const token = generateAuthToken(user._id);

        res.status(201).json({
          success: true,
          token,
          msg: "Hold on, we're logging you in...",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Server error, please try again later",
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
