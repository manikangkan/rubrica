import Evoluter from "../../../models/Evoluter.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  const { method } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const evoluters = await Evoluter.find({});
        res.status(200).json({ success: true, data: evoluters });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const evoluter = await Evoluter.create(req.body);
        res.status(201).json({
          success: true,
          data: evoluter,
          msg: "Hold on, we're sending the invitation...",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Sorry, we couldn't send the invitation. Please try again.",
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
