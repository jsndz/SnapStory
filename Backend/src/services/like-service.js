
import LikeRepository from "../repository/like-repository.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async createLikes(data) {
    try {
      const like = await this.likeRepository.create(data);
      return like;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async getLikes() {
    try {
      const likes = await this.likeRepository.getAll();
      return likes;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async get(LikeId) {
    try {
      const like = await this.likeRepository.get(LikeId);
      return like;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
    
  }
  async update(LikeId, data) {
    try {
      const like = await this.likeRepository.update(LikeId, data);
      return like;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async delete(LikeId) {
    try {
      const like = await this.likeRepository.destroy(LikeId);
      return like;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}

export default LikeService;
