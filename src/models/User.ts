export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}
export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: string;
}
export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}
export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _password: string,
    private _role: USER_ROLES,
    private _createdAt: string
  ) {}
  public set id(value: string) {
    this._id = value;
  }
  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get role(): USER_ROLES {
    return this._role;
  }
  public set role(value: USER_ROLES) {
    this._role = value;
  }
  public get createdAt(): string {
    return this._createdAt;
  }
  public set createdAt(value: string) {
    this._createdAt = value;
  }
  public toDBModel(): UserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt,
    };
  }

}
