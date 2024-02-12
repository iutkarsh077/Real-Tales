import BlogUser from "@/models/blogUser";
import MyUserBlogs from "@/models/blogs";
import { NextResponse } from "next/server";
import connectDB from "@/database/connectDB";

export async function POST(req){
    await connectDB();
    const { title, description, uid} = await req.json();
    // console.log(title, description, uid);

    if (!title || !description || !uid) {
        return NextResponse.json({ success: false, msg: "Please Provide required Info" }, { status: 401 });
    }

    const findingUser = await BlogUser.findOne({uid});

    if(!findingUser){
        return NextResponse.json({ success: false, msg: "User Not available" }, { status: 401 });
    }

    const createBlog = await MyUserBlogs.create({
        uid: findingUser.uid,
        title: title,
        description: description
    });

    // console.log(createBlog);
    
    return NextResponse.json({ success: true, msg: "Done", createBlog });
}