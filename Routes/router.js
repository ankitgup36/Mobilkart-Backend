import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  getUserDetails,
  LoginUser,
  registerUser,
} from "../Controllers/controllers.js";

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", registerUser);
router.post("/cart", addCartItem);
router.post("/cart/items", getCartItems);
router.post("/cart/items/delete", deleteCartItem);
router.post("/userdetail", getUserDetails);
export default router;
