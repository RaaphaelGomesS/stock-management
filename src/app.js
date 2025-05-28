import fastify from "fastify";
import cors from "cors";
import router from "./router/router.js";
import "dotenv/config";

const app = fastify();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

//Middleware para disparar os erros
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log("aplicação rodando!");
});