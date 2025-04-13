import { Request, Response } from "express";
import { registerUserService } from "./register-user.service";
import { RegisterUserRequest } from "./requests/register-user.dto";
import { UserRegisterMapper } from "./mappers/user-register.mapper";
import { IBaseService } from "../../@shared/services/base.service";
import { User } from "../user/model";

class RegisterController {
  constructor(
    private readonly registerUser: IBaseService<RegisterUserRequest, User>
  ) {}

  async register(req: Request<{}, {}, RegisterUserRequest>, res: Response) {
    const user = await this.registerUser.execute(req.body);

    res.status(201).json(UserRegisterMapper.toResponse(user));
  }
}

export const registerController = new RegisterController(registerUserService);
