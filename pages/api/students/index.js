import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Student from "../../../models/Student.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // @route   GET api/students
    // @desc    Fetch all students
    // @access  Public
    case "GET":
      try {
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   POST api/students
    // @desc    Create a student
    // @access  Private
    case "POST":
      verifyAuthToken(req, res);
      try {
        const student = await Student.create(req.body);

        res.status(201).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
