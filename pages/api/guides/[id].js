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
    // @route   GET api/guides/:id
    // @desc    Get specific guide
    // @access  Private
    case "GET":
      try {
        const guide = await Guide.findById(req.query.id);
        if (!guide) {
          return res.status(404).json({
            success: false,
            msg: "Guide not found",
          });
        }
        res.status(200).json({
          success: true,
          data: guide,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Guide not found",
        });
      }
      break;
    // @route   PUT api/guides/:id
    // @desc    Update specific guide
    // @access  Private
    case "PUT":
      try {
        const guide = await Guide.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!guide) {
          return res.status(404).json({
            success: false,
            msg: "Guide not found",
          });
        }
        res.status(200).json({
          success: true,
          data: guide,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Guide not found",
        });
      }
      break;
    // @route   DELETE api/guides/:id
    // @desc    Delete specific guide
    // @access  Private
    case "DELETE":
      try {
        const guide = await Guide.findByIdAndDelete(req.query.id);
        if (!guide) {
          return res.status(404).json({
            success: false,
            msg: "Guide not found",
          });
        }
        res.status(200).json({
          success: true,
          data: guide,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Guide not found",
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
