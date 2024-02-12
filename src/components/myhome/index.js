"use client";
import { UserContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MyHome = () => {
  const [AllPosts, setAllPosts] = useState([]);
  const { setSinglePost } = useContext(UserContext);
  const router = useRouter();
  const AddPostToHome = async () => {
    try {
      const res = await fetch("/api/blogs/getallblogs", {
        method: "GET",
      });
      const dataFormat = await res.json();
      // console.log(dataFormat.AllPosts);
      setAllPosts(dataFormat.AllPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AddPostToHome();
  }, []);

  const handleSinglePost = (post) =>{
    // console.log(post);
    setSinglePost(post);
    router.push("/seeme")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 m-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hover:cursor-pointer">
        {AllPosts.map((post) => (
          <div 
            key={post._id}
            className="bg-white max-h-72 rounded-lg shadow-md p-4 overflow-hidden"
            onClick={()=> handleSinglePost(post)}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              {post.title}
            </h3>
            <p className="text-gray-700">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHome;
