import connectDB from "@/database/connectDB";
import Account from "@/models/blogUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, username, uid, avatar } = await req.json();
    // console.log(name, username, uid, avatar);

    if (!uid || !name) {
      return NextResponse.json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingAccount = await Account.findOne({ uid });
    if (existingAccount) {
      return NextResponse.json({
        success: false,
        message: "Account already exists",
        existingAccount
      });
    }

    const newAccount = await Account.create({
      name,
      avatar,
      uid,
      username,
    });

    if (newAccount) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully",
        newAccount
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
