import connectDB from "@/database/connectDB";
import MyUserBlogs from "@/models/blogs";
import { NextResponse } from "next/server";
export async function DELETE(req) {
    await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log(id);

    if (!id) {
      return NextResponse.json(
        { status: false, msg: "Please try again" },
        { status: 501 }
      );
    }

    const deletePost = await MyUserBlogs.findByIdAndDelete({_id: id});
    // console.log(deletePost);

    return NextResponse.json(
      { status: true, msg: "Successfully Removed" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
