import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No Token Provided." });
    }

    jwt.verify(token, process.env.JWT_SECREAT, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid Token" });
      }
      req.user = decoded; // Attach user details to request
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { verifyToken };