
import BlogRepository from "../repository/blog-repository";

class BlogService {
  constructor() {
    this.blogRepository = new BlogRepository();
  }
  async createBlogs(data) {
    try {
      const blog = await this.blogRepository.create(data);
      return flight;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async getBlogs() {
    try {
      const blogs = await this.blogRepository.getAll();
      return blogs;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async get(blogId) {
    try {
      const blog = await this.blogRepository.get(blogId);
      return blog;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
    
  }
  async update(blogId, data) {
    try {
      const blog = await this.blogRepository.update(blogId, data);
      return blog;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
  async delete(blogId) {
    try {
      const blog = await this.blogRepository.destroy(blogId);
      return blog;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}

export default BlogService;
