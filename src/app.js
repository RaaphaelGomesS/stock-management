import express from "express";
import cors from "cors";
import UserRouter from "./router/UserRouter.js";
import "dotenv/config";
import StockRouter from "./router/StockRouter.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuração das rotas
app.use("/", UserRouter);
app.use("/stock", StockRouter);

//Middleware para disparar os erros
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ [err.name]: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("aplicação rodando!");
});
