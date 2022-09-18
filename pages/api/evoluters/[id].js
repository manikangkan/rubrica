import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Evoluter from "../../../models/Evoluter.model";
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
    // @route   GET api/evoluters/:id
    // @desc    Get specific evoluter
    // @access  Private
    case "GET":
      try {
        const evoluter = await Evoluter.findById(req.query.id);
        res.status(200).json({ success: true, data: evoluter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   PUT api/evoluters/:id
    // @desc    Update specific evoluter
    // @access  Private
    case "PUT":
      try {
        const evoluter = await Evoluter.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({ success: true, data: evoluter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   DELETE api/evoluters/:id
    // @desc    Delete specific evoluter
    // @access  Private
    case "DELETE":
      try {
        const evoluter = await Evoluter.deleteOne({ _id: req.query.id });
        res.status(200).json({ success: true, data: evoluter });
      } catch (error) {
        res.status(400).json({ success: false });
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
