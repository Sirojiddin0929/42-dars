import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const authGuard = (req, res, next) => {
    try{
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing" });
      }

      const token = authHeader.split(" ")[1];
    
      const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
      req.user=decoded
      next()
    }catch(err) {
     return res.status(403).json({ message: "Token notogri yoki muddati tugagan", error: err.message });
  }
};
