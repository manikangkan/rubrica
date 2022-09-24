import User from "../../models/User.model";
import dbConnect from "../../server-utils/connectDB";
import bcrypt from "bcrypt";
import generateAuthToken from "../../middleware/generateAuthToken.middleware";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // @route   POST api/signup
    // @desc    Create a user admin
    // @access  Public
    case "POST":
      try {
        const { name, email, password } = req.body;
        if (!email && !password && password.length < 6) {
          return res.status(400).json({
            success: false,
            msg: "Please enter all fields",
          });
        }

        const user = await User.findOne({
          email: email.toLowerCase(),
        });
        if (user) {
          return res.status(400).json({
            success: false,
            msg: "User already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
        });

        const token = generateAuthToken(newUser._id);

        res.status(201).json({
          success: true,
          data: newUser,
          token,
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
