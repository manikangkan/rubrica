import jwt from "jsonwebtoken";

export default function verifyAuthToken(req, res) {
  try {
    const token = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to access this route",
      });
    }

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET
    );
    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "You are not authorized to access this route",
      });
    }
    req.userId = userId;
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to access this route",
      error: error.message,
    });
  }
}
