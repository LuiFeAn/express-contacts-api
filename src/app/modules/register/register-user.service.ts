import { IBaseService } from "../../@shared/services/base.service";
import { RequestError } from "../../@shared/errors/request.error";
import { User } from "../user/model";
import { IUserRepository } from "../user/repositories/user.interface.repository";
import { userSqliteRepository } from "../user/repositories/user.sqlite.repository";
import { RegisterUserRequest } from "./requests/register-user.dto";

export class RegisterUserService
  implements IBaseService<RegisterUserRequest, User>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterUserRequest): Promise<User> {
    const emailAlreadyExists = await this.userRepository.emailExists(dto.email);

    if (emailAlreadyExists) {
      throw new RequestError("Email já cadastrado", {
        statusCode: 409,
      });
    }

    const user = new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    user.hashPassword();

    await this.userRepository.create(user);

    return user;
  }
}

export const registerUserService = new RegisterUserService(
  userSqliteRepository
);
