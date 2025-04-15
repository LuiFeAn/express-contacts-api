import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodSchema } from "zod";
import { RequestError } from "../errors/request.error";

export enum ValidationType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

export const zodRequestValidationMiddleware = (schema: ZodSchema, type: ValidationType = ValidationType.BODY) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[type]);
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const requestError = new RequestError<ZodIssue>(
          "Corpo da requisição inválido",
          {
            statusCode: 400,
            errors: error.issues,
          }
        );
        return res.status(400).json(requestError);
      }
    }
  };
};
