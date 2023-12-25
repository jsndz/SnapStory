import Blog from "../models/Blog.js";
import CrudRepository from "./crud-repository.js";
class BlogRepository extends CrudRepository {
  constructor() {
    super(Blog);
  }

  async getForSearch(keyword) {
    try {
        const data = await Blog.find({
            $or: [
              {
                title: {
                  $regex: keyword,
                  $options: "i",
                },
              },
            ],
          });
          return data;
    } catch (error) {
        console.log("something went wrong in Blog repo");
        console.log(error);
    }
  }
}

export default BlogRepository;
