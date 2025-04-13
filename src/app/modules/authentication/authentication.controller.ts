import { Request, Response } from "express";
import {
  authenticationService,
  IAuthenticationOutput,
} from "./authentication.service";
import { UserAuthenticationMapper } from "./mappers/user-authentication.mapper";
import { IBaseService } from "../../@shared/services/base.service";
import { AuthenticationRequest } from "./requests/authentication.dto";

export class AuthenticationController {
  constructor(
    private readonly authentication: IBaseService<
      AuthenticationRequest,
      IAuthenticationOutput
    >
  ) {}

  async login(req: Request, res: Response) {
    const { token, user } = await this.authentication.execute(req.body);

    res
      .status(200)
      .json({ user: UserAuthenticationMapper.toResponse(user), token });
  }
}

export const authenticationController = new AuthenticationController(
  authenticationService
);
