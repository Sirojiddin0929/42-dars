import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRE }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRE }
  );

  return { accessToken, refreshToken };
};


export const register = async (req, res, next) => {
  try {
    const { name, phone, password, role } = req.body;
    const oldUser = await User.findOne({ phone });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, password: hash, role });

    

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const tokens = generateTokens(user);
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    });
  } catch (err) {
    next(err);
  }
};


export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const tokens = generateTokens(user);
      res.json({ message: "Tokens refreshed", ...tokens });
    });
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
