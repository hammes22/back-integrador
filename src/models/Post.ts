export interface PostDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  updated_at: string;
  created_at?: string;
  name?: string;
  id_post_comment?: string;
  count_comments?: number;
}

export interface Creator {
  id: string;
  name?: string;
}

export interface GetPostDB {
  id: string;
  creator: Creator;
  content: string;
  likes: number;
  dislikes: number;
  updated_at: string;
  created_at?: string;
  id_post_comment?: string;
  count_comments?: number;
}
export interface GetPostCommentDB {
  id: string;
  creator: Creator;
  content: string;
  likes: number;
  dislikes: number;
  updated_at: string;
  created_at?: string;
  id_post_comment?: string;
  comments?: GetPostDB[];
  count_comments?: number;

}
export interface PostLikeDB {
  likes: number;
  dislikes: number;
}

export class Post {
  constructor(
    private _id: string,
    private _creatorId: string,
    private _content: string,
    private _likes: number,
    private _dislikes: number,
    private _updatedAt: string,
    private _created_at?: string,
    private _name?: string,
    private _id_post_comment?: string,
    private _comments?: GetPostDB[],
    private _count_comments?: number
  ) {}
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get creatorId(): string {
    return this._creatorId;
  }
  public set creatorId(value: string) {
    this._creatorId = value;
  }
  public get content(): string {
    return this._content;
  }
  public set content(value: string) {
    this._content = value;
  }
  public get likes(): number {
    return this._likes;
  }
  public set setLikes(value: number) {
    this._likes += value;
  }
  public get dislikes(): number {
    return this._dislikes;
  }
  public set setDislikes(value: number) {
    this._dislikes += value;
  }
  public get updatedAt(): string {
    return this._updatedAt;
  }
  public set updatedAt(value: string) {
    this._updatedAt = value;
  }

  private toCreator: Creator = {
    id: this._creatorId,
    name: this._name,
  };

  public toDBModel(): PostDB {
    return {
      id: this._id,
      creator_id: this._creatorId,
      content: this._content,
      likes: this._likes,
      dislikes: this._dislikes,
      updated_at: this._updatedAt,
      created_at: this._created_at,
      id_post_comment: this._id_post_comment,
      count_comments: this._count_comments,
    };
  }

  public toGetDBModel(): GetPostDB {
    return {
      id: this._id,
      content: this._content,
      likes: this._likes,
      dislikes: this._dislikes,
      updated_at: this._updatedAt,
      created_at: this._created_at,
      creator: this.toCreator,
      id_post_comment: this._id_post_comment,
      count_comments: this._count_comments,
    };
  }

  public toGetDBModelPost(): GetPostCommentDB {
    return {
      id: this._id,
      content: this._content,
      likes: this._likes,
      dislikes: this._dislikes,
      updated_at: this._updatedAt,
      created_at: this._created_at,
      creator: this.toCreator,
      id_post_comment: this._id_post_comment,
      comments: this._comments,
      count_comments: this._count_comments,
    };
  }

  public addLike(value: number) {
    this._likes += value;
  }

  public removeLike(value: number) {
    if (this.likes > 0) {
      this._likes -= value;
    }
  }

  public addDislikes(value: number) {
    this._dislikes += value;
  }

  public removeDislikes(value: number) {
    if (this._dislikes > 0) {
      this._dislikes -= value;
    }
  }
}
