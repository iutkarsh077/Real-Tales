"use client";
import { UserContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
const AddPost = () => {
    const {data: session} = useSession();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {userData, loggedInAccount} = useContext(UserContext);
    const router = useRouter();
    // console.log(userData, loggedInAccount);
    const handleSubmit = async () =>{
        try {
          const res = await fetch('/api/blogs/createBlogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              uid: userData.existingAccount.uid
            })
        })
        const data = await res.json();
        // console.log(data);
        router.push('/home');

        } catch (error) {
          console.log(error);
        }
    }
  return (
   <>
   <div className="max-w-md mx-auto mt-8">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter title" onChange={(e)=> setTitle(e.target.value)} value={title}/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
        Description
      </label>
      <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Describe it"></textarea>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  </form>
</div>

   </>
  )
}

export default AddPost
