import Comment from '../models/Comment.js';
import CrudRepository from './crud-repository.js';
class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment)
    }
    async getWithBlogId(blogId){
        try {
            const result = await this.model.find({blogId:blogId});
            return result;
        } catch (error) {
            console.log("something went wrong in crud repo");
            console.log(error);
        }
    }
    

}

export default CommentRepository;