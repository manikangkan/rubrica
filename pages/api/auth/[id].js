import auth from "../../../middleware/auth.middleware";
import User from "../../../models/User.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;
  auth(req, res);
  await dbConnect();

  switch (method) {
    // @route   GET api/auth/:id
    // @desc    Get specific admin user
    // @access  Private
    case "GET":
      try {
        const user = await User.findById(req.query.id);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   GET api/auth/:id
    // @desc    Update specific admin user
    // @access  Private
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   GET api/auth/:id
    // @desc    Delete specific admin user
    // @access  Private
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: req.query.id });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }

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
