import jwt from "jsonwebtoken";
import Admin from "../../models/auth/admin.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.admin = admin;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
