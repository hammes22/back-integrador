import { Response, Request } from "express";
import { ZodError } from "zod";
import { StatusCode } from "../services/StatusCode";
import { BaseError } from "../error/BaseError";
import { UserBusiness } from "../business/UserBusiness";
import { CreateUserSchema, LoginSchema } from "../dto/user.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
      });
      const output = await this.userBusiness.signup(input);
      res.status(StatusCode.Created).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.Bad_Request).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(StatusCode.Internal_Server_Error).send("Erro inesperado");
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
      });

      const output = await this.userBusiness.login(input);

      res.status(StatusCode.OK).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.Bad_Request).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(StatusCode.Internal_Server_Error).send("Erro inesperado");
      }
    }
  };
}
