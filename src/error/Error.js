export class UserError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.name = "UserError";
        this.statusCode = statusCode;
    };
};