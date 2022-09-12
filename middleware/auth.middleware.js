import jwt from "jsonwebtoken";

export default (req, res) => {
  try {
    const token = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to access this route1",
      });
    }

    const { _id: userId } = jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET
    );
    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to access this route2",
      });
    }
    req.userId = userId;
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to access this route3",
      error: error.message,
    });
  }
};
