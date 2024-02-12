'use client';
import Navbar from "@/components/navbar";
import { UserContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const MySinglePost = () => {
  const { singlePost } = useContext(UserContext);
  const {data: session} = useSession();
  const name = session?.user?.name;

  
  if (!singlePost || Object.keys(singlePost).length === 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-white font-extrabold text-3xl">Loading...</h1>
      </div>
    ); 
  }

  
  return (
    <div className="overflow-hidden">
    <Navbar />
    <div className="p-4 flex justify-center items-center w-screen min-h-screen">
      <div className="flex justify-center items-center w-full">
        <div className="rounded overflow-hidden shadow-lg hover:cursor-pointer bg-white w-full max-w-md">
          <div className="px-6 py-4">
            <div className="flex justify-between">
            <div className="font-bold text-3xl mb-2 text-gray-700">{singlePost.title}</div>
            <p className="text-gray-700 text-base">~{name}</p>
            </div>
            <p className="text-gray-700 text-base">{singlePost.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MySinglePost;

