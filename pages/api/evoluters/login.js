import generateAuthToken from "../../../middleware/generateAuthToken.middleware";
import Evoluter from "../../../models/Evoluter.model";
import dbConnect from "../../../server-utils/connectDB";

export default async (req, res) => {
  await dbConnect();

  // @route   GET api/evoluters/login
  // @desc    Login evoluter
  // @access  Public
  try {
    const { id } = req.body;
    const evoluter = await Evoluter.findById(id);
    if (!evoluter) {
      return res.status(400).json({
        success: false,
        msg: "Evoluter does not exist",
      });
    }
    const token = generateAuthToken(evoluter._id);

    res.status(200).json({
      success: true,
      token,
      msg: "Great! You are now logged in",
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
