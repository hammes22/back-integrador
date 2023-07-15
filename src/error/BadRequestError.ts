import { StatusCode } from "../services/StatusCode";
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Requisição inválida") {
    super(StatusCode.Bad_Request, message);
  }
}
