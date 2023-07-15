import { StatusCode } from "../services/StatusCode";
import { BaseError } from "./BaseError";

export class DbError extends BaseError {
  constructor(message: string = "Error ao salvar dados no DB") {
    super(StatusCode.Not_Acceptable, message);
  }
}
