import Tag from '../models/Tag.js';
import CrudRepository from './crud-repository.js';
class TagRepository extends CrudRepository{
    constructor(){
        super(Tag)
    }
}

export default TagRepository;