import verifyAuthToken from "../../../middleware/verifyAuthToken.middleware";
import Evoluter from "../../../models/Evoluter.model";
import dbConnect from "../../../server-utils/connectDB";
import { sendEmail } from "../../../server-utils/sendEmail";
import baseURL from "../../../utils/baseURL";

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
    // @route   GET api/evoluters
    // @desc    Fetch all evoluters
    // @access  Private
    case "GET":
      try {
        const evoluters = await Evoluter.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: evoluters });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // @route   GET api/evoluters
    // @desc    Create new evoluter
    // @access  Private
    case "POST":
      try {
        const { name, email } = req.body;

        const evoluter = await Evoluter.findOne({
          email: email.toLowerCase(),
        });
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
            message: `Hi ${newEvoluter.name}, welcome to Rubrica. Please click on the link below to activate your account. ${baseURL}/evoluters/verification/${newEvoluter._id}`,
          });

          res.status(201).json({
            success: true,
            data: newEvoluter,
            msg: "Evoluter created successfully. Please check your email to activate your account.",
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            msg: "Error sending invitation email, please let the admin know.",
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
