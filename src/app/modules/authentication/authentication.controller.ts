import { Request, Response } from "express";
import {
  authenticationService,
  AuthenticationService,
} from "./authentication.service";
import { UserAuthenticationMapper } from "./mappers/user-authentication.mapper";

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async login(req: Request, res: Response) {
    const { token, user } = await this.authenticationService.execute(req.body);

    res
      .status(200)
      .json({ token, user: UserAuthenticationMapper.toRequest(user) });
  }
}

export const authenticationController = new AuthenticationController(
  authenticationService
);
