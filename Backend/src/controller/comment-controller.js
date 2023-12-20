import CommentService from "../services/comment-service.js";

const commentService = new CommentService();    

export const CreateComment = async (req, res) => {
    try {
      const response = await commentService.createComment(req.params.blogId,req.body.content);
      return res.status(201).json({
        data: response,
        message: "Successfully Commented",
        sucess: true,
        err: {},
      });
    } catch (error) {
      res.status(500).json({
        data: {},
        message: "coulnt be Commented",
        sucess: false,
        err: { error },
      });
    }
  };

  export const getAllCommentsOnBlog = async (req, res) => {
    try {
      const response = await commentService.getCommentsWithBlogId(req.params.blogId);
      return res.status(201).json({
        data: response,
        message: "Successfully got all comments on blog",
        sucess: true,
        err: {},
      });
    } catch (error) {
      res.status(500).json({
        data: {},
        message: "coulnt get comments on blog",
        sucess: false,
        err: { error },
      });
    }
  };
  