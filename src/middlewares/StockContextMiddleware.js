import { StockError } from "../error/Error.js";

export function stockContext(req, res, next) {
  const stockIdHeader = req.headers["x-stock-id"];

  if (!stockIdHeader) {
    return next(new StockError("O ID do estoque não foi informado no header da requisição.", 400));
  }

  const stockId = parseInt(stockIdHeader, 10);

  if (isNaN(stockId)) {
    return next(new StockError("O ID do estoque informado no header é inválido.", 400));
  }

  req.stockId = stockId;
  next();
}
