/* eslint-disable no-unused-vars */
import { Customer } from "../models/customer.model.js";
// import { DeliveryStaff } from "../models/deliveryStaff.model.js";
import { verifyToken,generateToken } from "../helper/jwt.js";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import { mailer } from "../helper/nodeMailer.js";
// import mongoose from "mongoose";
import { generateOtp } from "../helper/otp.js";
import { Otp } from "../models/otp.model.js";



export const register = async (req, res, next) => {
  // const session=await mongoose.startSession()
  try {

    // await session.startTransaction()
    const { email} = req.validatedData;
    
    const data = await Customer.findOne({ email })
    
    if (data) {
      // await session.abortTransaction()
      // await session.endSession()
      return res.status(404).json({message: `EMAIL ALREADY EXISTS`});
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newData = await Customer.create(req.validatedData);
    
    const user=newData
    const accessPayload = {id: user._id, name: user.name, email: user.email,role: user.role };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );
    const refreshPayload = { id: user._id,name: user.name, email: user.email,role: user.role };
    const refreshToken = await generateToken(
      refreshPayload,
      config.jwt.refreshSecret,
      '30d',
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save()
    const otp = await generateOtp()
    await mailer(user.email,otp)
    await Otp.create({otp,user_id:user._id})

    // await session.commitTransaction()
    // await session.endSession()
    
    // eslint-disable-next-line no-unused-vars
    const { password, ...rest} = user.toObject();
    return res.status(200).json({
      success: true,
      message: `Customer is successfully registered!`,
      data: rest
    });
  } catch (error) {
    // await session.abortTransaction()
    // await session.endSession()
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // const { email,password } = req.validatedData;
    
    const { email} = req.validatedData
    const data = await Customer.findOne({ email });
    
    if (!data) {
      return res.status(404).json({message: `Email is not found`});
    }
   
    const validPassword = await bcrypt.compare(
      req.validatedData.password,
      data.password,
    );
    
    
    if (!validPassword) {
      return res.status(404).json({message: `Password or email is incorrect` });
    }
    const accessPayload = {id: data._id, name: data.name, email: data.email,role: data.role };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );

    const refreshPayload = {id: data._id,name: data.name, email: data.email,role: data.role };
    const refreshToken = await generateToken(
      refreshPayload,
      config.jwt.refreshSecret,
      '30d',
    );
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;
    
    await data.save()
    const plainData = data.toObject();
    const { password, ...rest } = plainData;
    return res.status(200).json({message: `Login in OK`, data: rest, tokens: {accessToken, refreshToken} });
  } catch (error) {
    return next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({message:"error"});
    }
    const user = await Customer.findById(req.user.id);
    if (!user) {
      return res.status(404).json({message:"error"});
    }
    const plainData = user.toObject();
    const { password, ...rest } = plainData;  
    return res.status(200).send({ success: true, data: rest });
  } catch (error) {
    return next(error);
  }
};




export const refreshAccess = async (req, res, next) => {
  try {
    let { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    if (refreshToken.startsWith('"') && refreshToken.endsWith('"')) {
      refreshToken = refreshToken.substring(1, refreshToken.length - 1);
    }

    const verified = verifyToken(refreshToken, config.jwt.refreshSecret);
    const user = await Customer.findById(verified.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const accessToken = await generateToken(
      payload,
      config.jwt.accessSecret,
      "7d"
    );

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { verifyOtp, email } = req.validatedData;

    
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const otpData = await Otp.findOne({
      otp: verifyOtp,
      user_id: user._id,
    });

    if (!otpData) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    
    user.isActive = true;
    await user.save();

    await Otp.findByIdAndDelete(otpData._id);

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return next(error);
  }
};