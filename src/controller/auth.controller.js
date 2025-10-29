import { Customer } from "../models/customer.model.js";
import { DeliveryStaff } from "../models/deliveryStaff.model.js";
import { verifyToken,generateToken } from "../helper/jwt.js";
import bcrypt from "bcryptjs";
import { config } from "../config/index.js";


export const registerCustomer = async (req, res, next) => {
  try {
    const { email } = req.validatedData;
    console.log(req.validatedData);
    const data = await Customer.findOne({ email });
    console.log(data);
    if (data) {
      return res.status(404).json({message: `EMAIL ALREADY EXISTS`});
    }
    const newData = await Customer.create(req.validatedData);
    const accessPayload = { name: newData.name, email: newData.email };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );
    const refreshPayload = { name: newData.name, email: newData.email };
    const refreshToken = await generateToken(
      refreshPayload,
      config.jwt.refreshSecret,
      '30d',
    );
    newData.accessToken = accessToken;
    newData.refreshToken = refreshToken;
    await newData.save()
    const plainData = newData.toObject();
    const { password, ...rest } = plainData;
    return res.status(200).json({
      success: true,
      message: `Customer is successfully registered!`,
      data: rest
    });
  } catch (error) {
    return next(error);
  }
};

export const loginCustomer = async (req, res, next) => {
  try {
    const { email } = req.validatedData;
    const data = await Customer.findOne({ email });
    console.log(data);
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
    const accessPayload = { name: data.name, email: data.email };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );

    const refreshPayload = {name: data.name, email: data.email };
    const refreshToken = await generateToken(
      refreshPayload,
      config.jwt.refreshSecret,
      '30d',
    );
    data.accessToken = accessToken;
    console.log(accessToken);
    
    data.refreshToken = refreshToken;
    console.log(refreshToken);
    
    await data.save()
    const plainData = data.toObject();
    const { password, ...rest } = plainData;
    return res.status(200).json({message: `Login in OK`, data: rest, tokens: {accessToken, refreshToken} });
  } catch (error) {
    return next(error);
  }
};

export const registerDeliveryStaff = async (req, res, next) => {
  try {
    const { email } = req.validatedData;
    const data = await DeliveryStaff.findOne({ email });
    if (data) {
      return res.status(404).json({message: `Email is already exist`});
    }
    const newData = await DeliveryStaff.create(req.validatedData);
    const accessPayload = { name: newData.name, email: newData.email };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );
    const refreshPayload = { name: newData.name, email: newData.email };
    const refreshToken = await generateToken(
      refreshPayload,
      config.jwt.refreshSecret,
      '30d',
    );
    newData.accessToken = accessToken;
    newData.refreshToken = refreshToken;
    await newData.save()
    const plainData = newData.toObject();
    const { password, ...rest } = plainData;
    return res.status(200).json({message: `successfully registered OK`,data: rest});
  } catch (error) {
    return next(error);
  }
};

export const loginDeliveryStaff = async (req, res, next) => {
  try {
    const { email } = req.validatedData;
    const data = await DeliveryStaff.findOne({ email: email });
    if (!data) {
      return res.status(404).json({message: `Email is not found`});
    }
    const validPassword = await bcrypt.compare(
      req.validatedData.password,
      data.password,
    );
    if (!validPassword) {
      return res.status(404).json({message: `Email or Password is incorrect`});
    }
    const accessPayload = { name: data.name, email: data.email };
    const accessToken = await generateToken(
      accessPayload,
      config.jwt.accessSecret,
      '7d',
    );

    const refreshPayload = { name: data.name, email: data.email };
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
    return res.status(200).json({message: `successfully registered OK`,data: rest,tokens: {accessToken, refreshToken}});
  } catch (error) {
    return next(error);
  }
};



export const profileCustomer = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).send({ data: user });
  } catch (error) {
    return next(error);
  }
};

export const profileDeliveryStaff = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).send({ data: user });
  } catch (error) {
    return next(error);
  }
};

export const refreshAccessCustomer = async (req, res, next) => {
  try {
    const data = req.validatedData;
    const refreshToken = data.refreshToken;
    const verifiedToken = verifyToken(refreshToken, config.jwt.refreshSecret);
    const user = await Customer.findOne({ _id: verifiedToken.id });
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const accessToken = await generateToken(
      payload,
      config.jwt.accessSecret,
      '7d',
    );
    await data.save();
    return res.status(200).json({message: `Excchanged accesstoken OK`,accessToken});
  } catch (e) {
    return next(e);
  }
};

export const refreshAccessDeliveryStaff = async (req, res, next) => {
  try {
    const data = req.validatedData;
    const refreshToken = data.refreshToken;
    const verifiedToken = verifyToken(refreshToken, config.jwt.refreshSecret);
    const user = await DeliveryStaff.findOne({ _id: verifiedToken.id });
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const accessToken = await generateToken(
      payload,
      config.jwt.accessSecret,
      '7d',
    );
    await data.save();
    return res.status(200).json({message: `Exchanged accesstoken OK`,accessToken});
  } catch (error) {
    return next(error);
  }
};