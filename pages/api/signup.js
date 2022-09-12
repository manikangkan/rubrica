import User from "../../models/User.model";
import dbConnect from "../../server-utils/connectDB";
import bcrypt from "bcrypt";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
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

        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Server error, please try again later",
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
