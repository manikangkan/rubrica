import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Guide from "../../../models/Guide.model";
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
    // @route   GET api/guides
    // @desc    Fetch all guides
    // @access  Private
    case "GET":
      try {
        const guides = await Guide.find();
        res.status(200).json({
          success: true,
          data: guides,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Error fetching guides",
        });
      }
      break;

    // @route   POST api/guides
    // @desc    Create a guide
    // @access  Private
    case "POST":
      try {
        const guide = await Guide.create(req.body);
        res.status(201).json({
          success: true,
          data: guide,
          msg: "Guide created successfully",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: error.message,
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
