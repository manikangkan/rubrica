import User from "../../../models/User.model";
import dbConnect from "../../../server-utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Server error",
        });
      }
      break;

    case "POST":
      try {
        const { email, password } = req.body;
        if (!email && !password && password.length < 6) {
          return res.status(400).json({
            success: false,
            msg: "Please enter all fields",
          });
        }

        const user = await User.findOne({
          email: email.toLowerCase(),
        }).select("+password");
        if (!user) {
          return res.status(400).json({
            success: false,
            msg: "User does not exist",
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
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Server error",
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
