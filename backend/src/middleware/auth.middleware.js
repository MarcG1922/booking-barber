import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {

    console.log("🔐 AUTH MIDDLEWARE ACTIVADO");
    console.log("HEADERS 👉", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER 👉", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN EXTRAÍDO 👉", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED TOKEN 👉", decoded);

    req.user = decoded;

    next();

  } catch (err) {
    console.log("❌ JWT ERROR 👉", err.message);

    return res.status(401).json({
      error: "Invalid token"
    });
  }
};