import Comment from '../models/Comment.js';
import CrudRepository from './crud-repository.js';
class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment)
    }
    
    

}

export default CommentRepository;