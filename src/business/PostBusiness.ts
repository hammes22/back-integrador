import {
  CreatePostInputDTO,
  DeletePostInputDTO,
  EditPostInputDTO,
  GetPostIdInputDTO,
  GetPostInputDTO,
  LikePostInputDTO,
  PostOutputDTO,
} from "../dto/post.dto";
import { BadRequestError } from "../error/BadRequestError";
import { GetPostCommentDB, GetPostDB, Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostDatabase } from "../database/PostDatabase";
import { Like } from "../models/Like";

export class PostBusiness {
  constructor(
    private postDatabase = new PostDatabase(),
    private tokenManager = new TokenManager(),
    private idGenerator = new IdGenerator()
  ) {}

  private date = new Date();

  create = async (input: CreatePostInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const id = this.idGenerator.generate();
    const newPostDB = new Post(
      id,
      payload.id,
      input.content,
      0,
      0,
      this.date.toISOString(),
      this.date.toISOString(),
      undefined,
      input.idPost
    ).toDBModel();

    await this.postDatabase.create(newPostDB);
    const output: PostOutputDTO = {
      message: "Post criado com sucesso",
      postId: id,
    };

    return output;
  };

  getAllPosts = async (input: GetPostInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const posts = await this.postDatabase.getAllPosts();
    const allPosts: GetPostDB[] = posts.map((post) =>
      new Post(
        post.id,
        post.creator_id,
        post.content,
        post.likes,
        post.dislikes,
        post.updated_at,
        post.created_at,
        post.name,
        undefined,
        undefined,
        post.count_comments
      ).toGetDBModel()
    );

    return allPosts;
  };

  getPost = async (input: GetPostIdInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const post = await this.postDatabase.getPostId(input.id);
    if (!post) {
      throw new BadRequestError("id do post inválido");
    }

    const comments = await this.postDatabase.getComments(input.id);

    const commentsDB: GetPostDB[] = comments.map((comment) => {
      return new Post(
        comment.id,
        comment.creator_id,
        comment.content,
        comment.likes,
        comment.dislikes,
        comment.updated_at,
        comment.created_at,
        comment.name,
        comment.id_post_comment
      ).toGetDBModel();
    });

    const postDB: GetPostDB = new Post(
      post.id,
      post.creator_id,
      post.content,
      post.likes,
      post.dislikes,
      post.updated_at,
      post.created_at,
      post.name,
      post.id_post_comment,
      undefined,
      post.count_comments
    ).toGetDBModel();

    const postComment: GetPostCommentDB = { ...postDB, comments: commentsDB };

    return postComment;
  };

  editPost = async (input: EditPostInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }
    const postDB = await this.postDatabase.getPostId(input.id);
    if (!postDB) {
      throw new BadRequestError(`Não encontramos o post id: ${input.id}`);
    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError(
        `Somente o criador do post tem permissão para edita-lo`
      );
    }

    const editPostDB = new Post(
      postDB.id,
      postDB.creator_id,
      input.content,
      postDB.likes,
      postDB.dislikes,
      this.date.toISOString(),
      postDB.created_at
    ).toDBModel();

    await this.postDatabase.editPost(editPostDB);

    const output: PostOutputDTO = {
      message: "Post editado com sucesso",
      postId: postDB.id,
    };
    return output;
  };

  deletePost = async (input: DeletePostInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }
    const postDB = await this.postDatabase.getPostId(input.id);
    if (!postDB) {
      throw new BadRequestError(`Não encontramos o post id: ${input.id}`);
    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError(
        `Somente o criador do post tem permissão para deleta-lo`
      );
    }

    await this.postDatabase.deletePost(input.id);

    const output: PostOutputDTO = {
      message: "Post deletado com sucesso",
    };
    return output;
  };

  like = async (input: LikePostInputDTO) => {
    const payload = this.tokenManager.getPayload(input.token);
    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const postDB = await this.postDatabase.getPostId(input.id);
    if (!postDB) {
      throw new BadRequestError(`Não encontramos o post id: ${input.id}`);
    }

    if (payload.id === postDB.creator_id) {
      throw new BadRequestError(
        `O criador do post não tem permissão para dar like ou dislike`
      );
    }

    const newLike = new Like(payload.id, input.id, input.like);

    const editPostDB = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      this.date.toISOString(),
      postDB.created_at
    );

    const likeDB = await this.postDatabase.getWhereLike(newLike.toDBModel());

    if (likeDB) {
      if (likeDB.like !== input.like) {
        input.like ? editPostDB.addLike(1) : editPostDB.addDislikes(1);
        input.like ? editPostDB.removeDislikes(1) : editPostDB.removeLike(1);
        await this.postDatabase.editLike(newLike.toDBModel());
        const totalLikes = await this.postDatabase.editPost(
          editPostDB.toDBModel()
        );
        const output: PostOutputDTO = {
          message: `${input.like ? "Like" : "Dislike"} adicionado com sucesso`,
          totalLikes,
        };
        return output;
      }

      await this.postDatabase.deleteLike(newLike.toDBModel());
      input.like ? editPostDB.removeLike(1) : editPostDB.removeDislikes(1);
      const totalLikes = await this.postDatabase.editPost(
        editPostDB.toDBModel()
      );

      const output: PostOutputDTO = {
        message: `${input.like ? "Like" : "Dislike"} removido com sucesso`,
        totalLikes,
      };
      return output;
    }

    input.like ? editPostDB.addLike(1) : editPostDB.addDislikes(1);
    await this.postDatabase.createLike(newLike.toDBModel());
    const totalLikes = await this.postDatabase.editPost(editPostDB.toDBModel());
    const output: PostOutputDTO = {
      message: `${input.like ? "Like" : "Dislike"} adicionado com sucesso`,
      totalLikes,
    };
    return output;
  };
}
