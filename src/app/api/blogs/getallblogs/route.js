import connectDB from "@/database/connectDB";
import MyUserBlogs from "@/models/blogs";
import { NextResponse } from "next/server";

export async function GET(req){
    await connectDB();
    try {
        const AllPosts = await MyUserBlogs.find();
        // console.log(AllPosts);

        return NextResponse.json({status: true, msg: "Fetched Data", AllPosts}, {status: 201});
    } catch (error) {
        console.log(error);
    }
}