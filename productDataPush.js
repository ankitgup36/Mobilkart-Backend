import { Product } from "./Schemas/productSchema.js";

import { createRequire } from "module";
import { connection } from "./connectDB.js";
const require = createRequire(import.meta.url);
const products = require("./Utils/product.json");

const push = async () => {
  connection().then(() => {
    console.log("connection stable");
  });
  await Product.deleteMany();
  await Product.insertMany(products)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

push();
