import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    datePublished: {
      type: Date,
      default: Date.now,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  },
  { timestamps: true }
);

blogSchema.static.paginateBlogs = async function (page,pageSize){
  console.log("in blog model")
  const skip = (page - 1) * pageSize;

  const blogs = await this.find()
  .sort({datePublished:-1})
  .skip(skip)
  .limit(pageSize)
  .populate('user')
  .populate('tag')

  return blogs;
}

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
