import express from "express";
import {
  CreateBlog,
  getAllBlog,
  getBlogById,
  paginatingBlogs,
  searchBlogs
} from "../../controller/blog-controller.js";
import {
  CreateComment,
  getAllCommentsOnBlog
} from "../../controller/comment-controller.js";
import { signup, login, getUser } from "../../controller/auth-controller.js";
import { CreateTag } from "../../controller/tag-controller.js";
import {
  userRegistrationValidators,
  blogPostCreationValidators,
  commentCreationValidators,
  searchValidators,
  userLoginValidators,
  handleValidationErrors
} from "../../middleware/validator.js";
import { cacheMiddleware } from "../../middleware/redis-cache.js";


const router = express.Router();

router.post("/blog", blogPostCreationValidators, handleValidationErrors,CreateBlog);
router.get("/blogs", getAllBlog);
router.get("/blog/:id", getBlogById);
router.post("/blog/paginate", paginatingBlogs);
router.get("/blog/search/:keyword",searchValidators, handleValidationErrors,searchBlogs);

router.post("/:blogId/comment",commentCreationValidators, handleValidationErrors, CreateComment);
router.get("/:blogId/comments", getAllCommentsOnBlog);

router.post("/signup", userRegistrationValidators, handleValidationErrors,signup);
router.post("/login",userLoginValidators, handleValidationErrors, login);
router.get("/user/:id", getUser);

router.post("/tags", CreateTag);

export default router;
