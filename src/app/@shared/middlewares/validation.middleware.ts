import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodSchema } from "zod";
import { RequestError } from "../errors/request.error";

export const zodRequestValidationMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body);
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
