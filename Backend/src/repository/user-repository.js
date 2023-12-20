import User from '../models/User.js';
import CrudRepository from './crud-repository.js';
class UserRepository extends CrudRepository{
    constructor(){
        super(User)
    }
    async findBy (data) {
        try{
            const user = await User.findOne(data);
            return user;
        } catch(error){
            throw error;
        }
    }
}

export default UserRepository;