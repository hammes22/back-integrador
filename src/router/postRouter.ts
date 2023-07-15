import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostDatabase } from "../database/PostDatabase";

export const postRouter = express.Router();
const postController = new PostController(
  new PostBusiness(new PostDatabase(), new TokenManager(), new IdGenerator())
);

postRouter.post("/", postController.create);

postRouter.get("/", postController.getAllPosts);

postRouter.get("/:id", postController.getPost);

postRouter.put("/:id", postController.editPost);

postRouter.put("/:id/like", postController.like);

postRouter.delete("/:id", postController.deletePost);
