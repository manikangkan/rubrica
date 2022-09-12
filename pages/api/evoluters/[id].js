import Evoluter from "../../../models/Evoluter.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const evoluter = await Evoluter.findById(req.query.id);
        res.status(200).json({ success: true, data: evoluter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

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
