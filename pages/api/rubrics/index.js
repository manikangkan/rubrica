import Rubric from "../../../models/Rubric.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const rubrics = await Rubric.find({});
        res.status(200).json({ success: true, data: rubrics });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const rubric = await Rubric.create(req.body);
        res.status(201).json({ success: true, data: rubric });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
