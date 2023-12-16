
import UserRepository from '../repository/user-repository.js';
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup (data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
        
    }

    async getUserByEmail(email){
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signin(data){
        try {
            const user = await this.getUserByEmail(data.email);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;