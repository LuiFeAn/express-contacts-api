import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";

export const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestError) {
    return res.status(err.getStatusCode).json(err);
  }
  const error = new RequestError("Erro interno do servidor", {
    statusCode: 500,
  });
  return res.status(error.getStatusCode).json(error);
};
