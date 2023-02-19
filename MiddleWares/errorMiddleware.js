import asyncHandler from "express-async-handler";

export const errorMiddleware = async (err, req, res, next) => {
  res.status(400).send(err.message);
  next();
};
