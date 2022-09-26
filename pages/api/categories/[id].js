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
    // @route   GET api/categorires/:id
    // @desc    Get specific category
    // @access  Private
    case "GET":
      try {
        const category = await Category.findById(req.query.id);
        if (!category) {
          return res.status(404).json({
            success: false,
            msg: "No category found",
          });
        }
        res.status(200).json({
          success: true,
          data: category,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Something went wrong",
        });
      }
      break;

    // @route   PUT api/categories/:id
    // @desc    Update specific category
    // @access  Private
    case "PUT":
      try {
        const category = await Category.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!category) {
          return res.status(404).json({
            success: false,
            msg: "No category found",
          });
        }
        res.status(200).json({
          success: true,
          data: category,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Something went wrong",
        });
      }
      break;

    // @route   DELETE api/categories/:id
    // @desc    Delete specific category
    // @access  Private
    case "DELETE":
      try {
        const category = await Category.findByIdAndDelete(req.query.id);
        if (!category) {
          return res.status(404).json({
            success: false,
            msg: "No category found",
          });
        }
        res.status(200).json({
          success: true,
          data: {},
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Something went wrong",
        });
      }
      break;

    default:
      res.status(400).json({
        success: false,
      });
      break;
  }
};
