import jwt from "jsonwebtoken";

export default function generateAuthToken(userId) {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
