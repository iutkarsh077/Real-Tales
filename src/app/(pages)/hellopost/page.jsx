'use client';
import Navbar from "@/components/navbar";
import { UserContext } from "@/context";
import { useSession } from "next-auth/react";
import { MdDeleteSweep } from "react-icons/md";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const MySinglePost = () => {
  const router = useRouter();
  const { singlePost } = useContext(UserContext);
  const {data: session} = useSession();
  const name = session?.user?.name;
  // console.log(singlePost._id);

  
  if (!singlePost || Object.keys(singlePost).length === 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-white font-extrabold text-3xl">Loading...</h1>
      </div>
    ); 
  }

  const handleDelete = async () =>{
    console.log(singlePost._id);

    try {
      const res = await fetch(`/api/blogs/deletemyblogs?id=${singlePost._id}`, {
          method: 'DELETE',
      });
      // console.log(res);
      router.push("/profile")
  } catch (error) {
      console.error('Error deleting blog:', error);
      router.push('/profile')
  }
  }

  return (
    <div className="overflow-hidden">
    <Navbar />
    <div className="p-4 flex justify-center items-center w-screen h-screen">
      <div className="flex justify-center items-center w-full">
        <div className="rounded overflow-hidden shadow-lg hover:cursor-pointer bg-white w-full max-w-md">
          <div className="px-6 py-4">
            <div className="flex justify-between">
            <div className="font-bold text-3xl mb-2 text-gray-700">{singlePost.title}</div>
            <p className="text-gray-700 text-base">~{name}</p>
            </div>
            <p className="text-gray-700 text-base">{singlePost.description}</p>
            <p className="text-black text-3xl m-2"><MdDeleteSweep onClick={handleDelete}/></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MySinglePost;

