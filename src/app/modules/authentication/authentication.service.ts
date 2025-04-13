import { envs } from "./../../@shared/envs/index";
import { RequestError } from "../../@shared/errors/request.error";
import { IUserRepository } from "../user/repositories/user.interface.repository";
import { userSqliteRepository } from "../user/repositories/user.sqlite.repository";
import { AuthenticationRequest } from "./requests/authentication.dto";
import jwt from "jsonwebtoken";
import { User } from "../user/model";

export interface IAuthenticationOutput {
  user: User;
  token: string;
}

export class AuthenticationService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: AuthenticationRequest): Promise<IAuthenticationOutput> {
    const user = await this.userRepository.findByEmail(dto.email);

    const isPasswordValid = user?.comparePassword(dto.password);

    if (!user || !isPasswordValid) {
      throw new RequestError("Usuário não encontrado", {
        statusCode: 404,
      });
    }

    const token = jwt.sign({ id: user.id }, envs.jwtSecret, {
      expiresIn: "1h",
    });

    return { user, token };
  }
}

export const authenticationService = new AuthenticationService(
  userSqliteRepository
);
