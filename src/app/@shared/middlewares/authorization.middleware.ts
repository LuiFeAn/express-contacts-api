import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../envs";
import { RequestError } from "../errors/request.error";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers?.authorization;

  const unauthorized = new RequestError("Não autorizado", {
    statusCode: 401,
  });

  if (!authorization) {
    return res.status(401).json(unauthorized);
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json(unauthorized);
  }

  jwt.verify(token, envs.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json(unauthorized);
    }

    req.user = decoded as { id: number };
    next();
  });
};
