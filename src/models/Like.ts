export interface LikeDB {
  user_id: string;
  post_id: string;
  like: number;
}


export class Like {
  constructor(
    private _userId: string,
    private _postId: string,
    private _like: number
  ) {}

  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }
  public get postId(): string {
    return this._postId;
  }
  public set postId(value: string) {
    this._postId = value;
  }
  public get like(): number {
    return this._like;
  }
  public set like(value: number) {
    this._like = value;
  }

  public toDBModel(): LikeDB {
    return {
      user_id: this._userId,
      post_id: this._postId,
      like: this.like,
    };
  }
}
