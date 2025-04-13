import { Request, Response } from "express";
import {
  RegisterUserService,
  registerUserService,
} from "./register-user.service";
import { RegisterUserRequest } from "./requests/register-user.dto";
import { UserRegisterMapper } from "./mappers/user-register.mapper";
class RegisterController {
  constructor(private readonly userService: RegisterUserService) {}

  async register(req: Request<{}, {}, RegisterUserRequest>, res: Response) {
    const user = await this.userService.execute(req.body);

    res.status(201).json(UserRegisterMapper.toRequest(user));
  }
}

export const registerController = new RegisterController(registerUserService);
