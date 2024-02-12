import connectDB from "@/database/connectDB";
import MyUserBlogs from "@/models/blogs";
import { NextResponse } from 'next/server';
export async function POST(req){
    await connectDB();
    const {uid} = await req.json();
    // console.log(uid);

    if(!uid){
        return NextResponse.json({success: false, msg: "Unauthorized request"}, {status: 401})
    }

    const findMyBlogs =  await MyUserBlogs.find({uid});

    // console.log(findMyBlogs);
    // console.log(typeof findMyBlogs)

    if(!findMyBlogs){
        return NextResponse.json({success: false, msg: "You have not posted yet"}, {status: 202});
    }

    return NextResponse.json({success: true, msg: "All Posts fetched", findMyBlogs}, {status: 201})
}