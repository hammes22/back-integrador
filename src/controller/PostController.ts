import { Request, Response } from "express";
import { StatusCode } from "../services/StatusCode";
import { ZodError } from "zod";
import { BaseError } from "../error/BaseError";
import {
  CreatePostSchema,
  DeletePostSchema,
  EditPostSchema,
  GetPostIdSchema,
  GetPostSchema,
  LikePostSchema,
} from "../dto/post.dto";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  constructor(private postBusiness = new PostBusiness()) {}

  create = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        idPost: req.body.idPost,
        content: req.body.content,
        token: req.headers.authorization,
      });
      const output = await this.postBusiness.create(input);

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

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostSchema.parse({
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getAllPosts(input);

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

  getPost = async (req: Request, res: Response) => {
    try {
      const input = GetPostIdSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPost(input);

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

  editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
        content: req.body.content,
      });

      const output = await this.postBusiness.editPost(input);

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

  deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.deletePost(input);

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

  like = async (req: Request, res: Response) => {
    try {
      const input = LikePostSchema.parse({
        id: req.params.id,
        like: req.body.like,
        token: req.headers.authorization,
      });
      const output = await this.postBusiness.like(input);

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
