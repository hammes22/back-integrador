import { UserDatabase } from "../database/UserDatabase";
import {
  CreateUserInputDTO,
  LoginInputDTO,
  LoginOutputDTO,
  UserTokenOutputDTO,
} from "../dto/user.dto";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  private date = new Date();

  public signup = async (
    input: CreateUserInputDTO
  ): Promise<UserTokenOutputDTO> => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const userDBExists = await this.userDatabase.findUserByEmail(email);

    if (userDBExists) {
      throw new BadRequestError("'Email' já existe");
    }

    const hashedPassword = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      this.date.toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.signup(newUserDB);

    const payload: TokenPayload = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    };

    const token = this.tokenManager.createToken(payload);

    const output: UserTokenOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token,
      user: payload,
    };

    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado");
    }

    const hashedPassword = userDB.password;
    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const payload: TokenPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const token = this.tokenManager.createToken(payload);

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token,
      user: payload,
    };

    return output;
  };
}
