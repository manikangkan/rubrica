import Rubric from "../../../models/Rubric.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const rubric = await Rubric.findById(req.query.id);
        res.status(200).json({ success: true, data: rubric });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
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

    case "DELETE":
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
