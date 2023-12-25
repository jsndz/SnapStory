import  express  from "express";
import { CreateBlog, getAllBlog,getBlogById, paginatingBlogs ,searchBlogs} from "../../controller/blog-controller.js";
import { CreateComment, getAllCommentsOnBlog } from "../../controller/comment-controller.js";
import { signup,login,getUser } from "../../controller/auth-controller.js";
import { CreateTag } from "../../controller/tag-controller.js";

const router = express.Router();

router.post('/blog',CreateBlog);
router.get('/blogs',getAllBlog);
router.get('/blog/:id',getBlogById);
router.post('/blog/paginate',paginatingBlogs);
router.get('/blog/search/:keyword',searchBlogs);

router.post('/:blogId/comment',CreateComment);
router.get('/:blogId/comments',getAllCommentsOnBlog)


router.post('/signup',signup);
router.post('/login',login);
router.get('/user/:id',getUser);

router.post('/tags',CreateTag);

export default router;