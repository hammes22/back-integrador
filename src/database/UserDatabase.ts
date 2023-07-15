import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";
import { DbError } from "../error/DbError";
import { TABLE_USER } from "../constants/constantsTable";

export class UserDatabase extends BaseDatabase {
  public findUserByEmail = async (email: string): Promise<UserDB> => {
    const user: UserDB[] = await BaseDatabase.connection(TABLE_USER).where({
      email,
    });
    return user[0];
  };

  public signup = async (newUserDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(TABLE_USER)
      .insert(newUserDB)
      .catch((error) => {
        throw new DbError(error);
      });
  };
}
