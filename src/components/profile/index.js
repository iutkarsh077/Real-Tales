import { useSession } from "next-auth/react";
import UnAuthPage from "../unauthPage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context";
import { useRouter } from "next/navigation";
import SinglePost from "@/app/(pages)/hellopost/page";
const Profile = () => {
  const { data: session } = useSession();
  const { userData, setSinglePost } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();
  const avatar = userData?.existingAccount?.avatar;
  const name = userData?.existingAccount?.name;
  const username = userData?.existingAccount?.username;
  const uid = userData?.existingAccount?.uid;

  const getMyPosts = async () => {
    try {
      if (uid) {
        const res = await fetch("/api/blogs/getmyblogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        // Check if data is an object
        if (typeof data === "object" && !Array.isArray(data)) {
          // Convert object into an array if needed
          const dataArray = Object.values(data);
          setMyPosts(dataArray[2]);
        } else {
          // Otherwise, set myPosts to an empty array
          setMyPosts([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
      getMyPosts();
  }, [uid])

 

  if (session == null) return <UnAuthPage />;

  const handleSinglePost = (post) =>{
      console.log(post);

      // const mydata = Object.values(post);
      setSinglePost(post);
      router.push("/hellopost")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center mt-8">
        <img
          src={avatar}
          className="w-44 h-44 rounded-full border-4 border-blue-500"
          alt="Avatar"
        />
        <div className="pt-4 pb-1 text-xl font-semibold">{name}</div>
        <div className="text-blue-500">@{username}</div>
      </div>
      <div className="container mx-auto mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Your Posts</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={getMyPosts}
          >
            Refresh Post
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPosts.map((post) => (
            <div key={post._id} onClick={()=>handleSinglePost(post)} className="bg-white max-h-72 rounded-lg shadow-md p-4 overflow-hidden">
              <div className="flex justify-between">  
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{post.title}</h3>
              <p className="text-gray-700 pt-1 text-sm">~By {name}</p>
              </div>
              <p className="text-gray-700">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;


//now we have to edit and delete the post in a a user proifle