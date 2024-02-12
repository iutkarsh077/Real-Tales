import mongoose from "mongoose";

const MyBlogUser = new mongoose.Schema(
  {
    uid: String,
    name: String,
    username: String,
    avatar: String || '',
  },
  { timestamps: true }
);

const BlogUser =
  mongoose.models.MyBlogUser || mongoose.model("MyBlogUser", MyBlogUser);

export default BlogUser;