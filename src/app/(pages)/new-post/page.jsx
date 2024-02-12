"use client";
import Navbar from '@/components/navbar'
import UnAuthPage from '@/components/unauthPage';
import AddPost from '@/components/newPost';
import { useSession } from 'next-auth/react'
import React from 'react'

const NewPost = () => {
    const { data: session } = useSession();
  if(session == null) return <UnAuthPage/>
  return (
    <div>
        <Navbar/>
        <AddPost/>
    </div>
  )
}

export default NewPost
