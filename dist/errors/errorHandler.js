"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const ApiError_1 = require("./ApiError");
const http_status_codes_1 = require("http-status-codes");
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        return res
            .status(err.statusCode)
            .json({ error: err.message, details: err.details });
    }
    console.error(err);
    res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
}
