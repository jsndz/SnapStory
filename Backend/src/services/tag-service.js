
import TagRepository from "../repository/tag-repository.js";

class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }
  async createTags(data) {
    try {
      const tag = await this.tagRepository.create(data);
      return tag;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async getTags() {
    try {
      const tags = await this.TagRepository.getAll();
      return tags;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async get(TagId) {
    try {
      const tag = await this.TagRepository.get(TagId);
      return tag;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
    
  }
  async update(TagId, data) {
    try {
      const tag = await this.TagRepository.update(TagId, data);
      return tag;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async delete(TagId) {
    try {
      const tag = await this.TagRepository.destroy(TagId);
      return tag;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}

export default TagService;
