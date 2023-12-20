
import CommentRepository from "../repository/comment-repository.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  async createComment(data) {
    try {
      const comment = await this.commentRepository.create(data);
      return comment;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async getAllComments() {
    try {
      const comments = await this.commentRepository.getAll();
      return comments;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async get(commentId) {
    try {
      const comment = await this.commentRepository.get(commentId);
      return comment;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
    
  }
  async update(commentId, data) {
    try {
      const comment = await this.commentRepository.update(commentId, data);
      return comment;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async delete(commentId) {
    try {
      const comment = await this.commentRepository.destroy(commentId);
      return comment;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}

export default CommentService;