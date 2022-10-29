import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Rubric from "../../../models/Rubric.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // @route   GET api/rubrics
    // @desc    Fetch all rubrics
    // @access  Public
    case "GET":
      try {
        const rubrics = await Rubric.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: rubrics });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   GET api/rubrics
    // @desc    Create a rubric
    // @access  Private
    case "POST":
      // verifyAuthToken(req, res);
      try {
        const rubric = await Rubric.create(req.body);
        res.status(201).json({ success: true, data: rubric });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
