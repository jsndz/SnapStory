import Like from '../models/Like.js';
import CrudRepository from './crud-repository.js';
class LikeRepository extends CrudRepository{
    constructor(){
        super(Like)
    }
}

export default LikeRepository;