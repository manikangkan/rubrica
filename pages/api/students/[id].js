import auth from "../../../middleware/auth.middleware";
import Student from "../../../models/Student.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // @route   GET api/students/:id
    // @desc    Fetch specific student
    // @access  Public
    case "GET":
      try {
        const student = await Student.findById(req.query.id);
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   PUT api/students/:id
    // @desc    Update a student
    // @access  Private
    case "PUT":
      auth(req, res);
      try {
        const student = await Student.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   DELETE api/students/:id
    // @desc    Delete a student
    // @access  Private
    case "DELETE":
      auth(req, res);
      try {
        await Student.deleteOne({ _id: req.query.id });
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
