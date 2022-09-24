import jwt from "jsonwebtoken";

export default function verifyAuthToken(req, res) {
  try {
    const token = req.headers;
    if (!token) {
      return false;
    }

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET
    );
    if (!userId) {
      return false;
    }
    req.userId = userId;
    return true;
  } catch (error) {
    return false;
  }
}
