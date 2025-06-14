import { ErrorHandler } from "@/types";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: ErrorHandler,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const { statusCode = 500, message = "Internal Server Error", errors } = err;

  res.status(statusCode).json({
    statusCode,
    message,
    ...(errors && { errors }),
  });
};

export default errorHandler;
