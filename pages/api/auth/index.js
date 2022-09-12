import User from "../../../models/User.model";
import dbConnect from "../../../server-utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
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

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

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
