import express from "express";
import cors from "cors";
import UserRouter from "./router/UserRouter.js";
import ProductRouter from "./router/ProductRouter.js"
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuração das rotas
app.use("/", UserRouter);
app.use("/product", ProductRouter);

//Middleware para disparar os erros
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ [err.name]: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("aplicação rodando!");
});
