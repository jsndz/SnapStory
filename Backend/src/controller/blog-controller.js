import BlogService from "../services/blog-service.js";

const blogService = new BlogService();

export const CreateBlog = async (req, res) => {
  try {
    console.log(req.body);
    const response = await blogService.createBlogs(req.body);
    return res.status(201).json({
      data: response,
      message: "Successfully Bloged",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be Bloged",
      sucess: false,
      err: { error },
    });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const response = await blogService.getAllBlogs();
    console.log(response);
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a Blogs from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt get Blogs",
      sucess: true,
      err: { error },
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const response = await blogService.getBlog(req.params.id);
    console.log(response);
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a Blog from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be Bloged",
      sucess: true,
      err: { error },
    });
  }
};

export const paginatingBlogs = async (req, res) => {
  try {
    console.log(req.body);
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;

    const response = await blogService.getPaginatedBlogs(page, pageSize);

    return res.status(201).json({
      data: response,
      message: "Successfully fetched a Blog from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt get the Blogs",
      sucess: false,
      err: { error },
    });
  }
};


export const searchBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogsForSearch(req.params.keyword);
    return res.status(201).json({
      data: blogs,
      message: "Successfully fetched blogs for search from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt get the Blogs",
      sucess: true,
      err: { error },
    });
  }
};
