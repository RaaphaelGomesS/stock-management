import express from "express";
import cors from "cors";
import "dotenv/config";
import UserRouter from "./router/UserRouter.js";
import StockRouter from "./router/StockRouter.js";
import ShelfRouter from "./router/ShelfRouter.js";
import ProductRouter from "./router/ProductRouter.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", UserRouter);
app.use("/stock", StockRouter);
app.use("/shelf", ShelfRouter);
app.use("/product", ProductRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ [err.name]: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("aplicação rodando!");
});
