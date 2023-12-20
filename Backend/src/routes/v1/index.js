import  express  from "express";
import { CreateBlog, getAllBlog,getBlogById } from "../../controller/blog-controller.js";


const router = express.Router();

router.post('/blog',CreateBlog);
router.get('/blogs',getAllBlog);
router.get('/blog/:id',getBlogById);


export default router;