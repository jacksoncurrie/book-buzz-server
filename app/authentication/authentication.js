import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tokenSecret = process.env.TOKEN_SECRET ?? "Application Secret";

export const generateAccessToken = (username) => {
  return jwt.sign(username, tokenSecret, { expiresIn: "3600s" });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const generateHash = async (password) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

export const checkPassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};
