import User from "../Schemas/userSchema.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config.js";
import { Product } from "../Schemas/productSchema.js";

const getAuthToken = async (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRETS, { expiresIn: "2d" });
};

export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide all details");
  }

  const findUser = await User.findOne({ email });
  const hashedPass = bcrypt.compare(password, findUser.password);
  if (!findUser || !hashedPass) {
    throw new Error("Invalid user credentials");
  }
  const token = await getAuthToken(findUser._id);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000000000),
  });
  res.status(200).send({ data: token, id: findUser._id });
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email, phone, address } = await req.body;

  //   check details
  if (!email || !password || !name) {
    return res.status(400).send("Please provide all details");
  }

  // // find users
  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(400).send("User already exist");
  }

  // create users
  const user = await User.create({ name, password, email, address });
  console.log(address);
  res.json({ email, password, phone, name, address });
});

export const GetProducts = asyncHandler(async (req, res) => {
  const { category, search, sortBy } = req.query;
  const value = sortBy === "des" ? -1 : 1;
  console.log(search);
  const data = await Product.find({
    category,
    name: { $regex: search, $options: "i" },
  }).sort({ price: value });
  res.send(data);
});

export const addCartItem = async (req, res) => {
  const userId = await req.body.userId;
  const product = (await req.body.item) || req.body.showProduct;
  await User.updateOne(
    { userId },
    {
      $push: {
        orders: product,
      },
    }
  );
  const user = await User.findOne({ userId });
  res.send(user);
};

export const getCartItems = async (req, res) => {
  const userId = await req.body.id;
  const user = await User.findOne({ userId });
  res.send(user.orders);
};

export const deleteCartItem = async (req, res) => {
  const { userId, _id } = await req.body;
  await User.updateOne(
    { userId },
    {
      $pull: {
        orders: {
          _id,
        },
      },
    }
  );
  const user = await User.findOne({ userId });
  res.send(user);
};

export const getUserDetails = async () => {
  const { userId } = req.body;
  const user = await User.findOne({ userId });
  res.send(user);
};
