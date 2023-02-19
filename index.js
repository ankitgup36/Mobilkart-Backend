import bodyParser from "body-parser";
import express from "express";
import { connection } from "./connectDB.js";
import { errorMiddleware } from "./MiddleWares/errorMiddleware.js";
import router from "./Routes/router.js";
import cors from "cors";
import pRouter from "./Routes/pRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/users", router);
app.use("/api/products", pRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    connection();
    app.listen(PORT, () => {
      console.log("port listening....");
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
