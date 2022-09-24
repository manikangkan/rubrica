import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Rubric from "../../../models/Rubric.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;
  const isVerified = verifyAuthToken(req, res);
  if (!isVerified) {
    return res.status(401).json({
      success: false,
      msg: "You are not authorized to access this route",
    });
  }

  await dbConnect();

  switch (method) {
    // @route   GET api/rubrics/:id
    // @desc    Fetch specific rubric
    // @access  Public
    case "GET":
      try {
        const rubric = await Rubric.findById(req.query.id);
        res.status(200).json({ success: true, data: rubric });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   PUT api/rubrics/:id
    // @desc    Update specific rubric
    // @access  Private
    case "PUT":
      verifyAuthToken(req, res);
      try {
        const rubric = await Rubric.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ success: true, data: rubric });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   DELETE api/rubrics/:id
    // @desc    Delete specific rubric
    // @access  Private
    case "DELETE":
      verifyAuthToken(req, res);
      try {
        await Rubric.deleteOne({ _id: req.query.id });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
