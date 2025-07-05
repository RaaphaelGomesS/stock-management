export class UserError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "UserError";
    this.statusCode = statusCode;
  }
}

export class StockError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "StockError";
    this.statusCode = statusCode;
  }
}

export class ProductError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ProductError";
    this.statusCode = statusCode;
  }
}
