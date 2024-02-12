  import mongoose from 'mongoose';


  const MyBlogs = new mongoose.Schema({
      uid: String,
      title: String,
      description: String
  })

  const MyUserBlogs =
    mongoose.models.MyBlogs || mongoose.model("MyBlogs", MyBlogs);

  export default MyUserBlogs;