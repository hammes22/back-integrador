import { StatusCode } from "../services/StatusCode";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Recurso não encontrado") {
    super(StatusCode.Not_Found, message);
  }
}
