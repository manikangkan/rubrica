import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Category from "../../../models/Category.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;
  // const isVerified = verifyAuthToken(req, res);
  // if (!isVerified) {
  //   return res.status(401).json({
  //     success: false,
  //     msg: "You are not authorized to access this route",
  //   });
  // }

  await dbConnect();

  switch (method) {
    // @route   GET api/categories
    // @desc    Fetch all categories
    // @access  Public
    case "GET":
      try {
        const categories = await Category.find();
        res.status(200).json({
          success: true,
          data: categories,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    // @route   POST api/categories
    // @desc    Create a new category
    // @access  Private

    case "POST":
      try {
        const { name, students } = req.body;
        const category = await Category.create({
          name,
          students,
        });
        res.status(201).json({
          success: true,
          data: category,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({
        success: false,
        msg: "Invalid request",
      });
      break;
  }
};
