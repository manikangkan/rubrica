import Evoluter from "../../../models/Evoluter.model";
import dbConnect from "../../../server-utils/connectDB";
import { sendEmail } from "../../../server-utils/sendEmail";
import baseURL from "../../../utils/baseURL";

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
        const { name, email } = req.body;

        const evoluter = await Evoluter.findOne({ email: email.toLowerCase() });
        if (evoluter) {
          return res.status(400).json({
            success: false,
            msg: "Evoluter already exists",
          });
        }

        const newEvoluter = await Evoluter.create({
          name,
          email: email.toLowerCase(),
        });

        try {
          await sendEmail({
            email: newEvoluter.email,
            subject: "Welcome to Rubrica",
            message: `Hi ${newEvoluter.name}, welcome to Rubrica. Please click on the link below to activate your account. ${baseURL}/activate/${newEvoluter._id}`,
          });

          res.status(201).json({
            success: true,
            data: newEvoluter,
            msg: "Evoluter created successfully. Please check your email to activate your account.",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            msg: "Error sending invitation email",
          });
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          msg: "Sorry, we couldn't send the invitation. Please try again.",
          error: error,
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
