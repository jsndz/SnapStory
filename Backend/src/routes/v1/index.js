import  express  from "express";
import { CreateBlog, getAllBlog,getBlogById } from "../../controller/blog-controller.js";
import { CreateComment, getAllCommentsOnBlog } from "../../controller/comment-controller.js";

const router = express.Router();

router.post('/blog',CreateBlog);
router.get('/blogs',getAllBlog);
router.get('/blog/:id',getBlogById);
router.post('/:blogId/comment',CreateComment);
router.get('/:blogId/comments',getAllCommentsOnBlog)


export default router;