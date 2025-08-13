import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import UserRouter from "./router/UserRouter.js";
import StockRouter from "./router/StockRouter.js";
import ShelfRouter from "./router/ShelfRouter.js";
import ProductRouter from "./router/ProductRouter.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

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
