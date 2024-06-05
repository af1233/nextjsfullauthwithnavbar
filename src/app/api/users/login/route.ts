import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDB from "@/app/dbconfig/db";
import User from "@/models/userModel";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Please fill all the fields",
        },
        {
          status: 400,
        }
      );
    }
    const ExistUser = await User.findOne({ email });
    //    console.log(ExistUser);
    if (!ExistUser) {
      return NextResponse.json(
        {
          message: "Email Doesn't Exist",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.compare(password, ExistUser.password);
    if (!hashedPassword) {
      return NextResponse.json(
        {
          message: "Password is incorrect",
        },
        {
          status: 400,
        }
      );
    }
    const token = await jwt.sign(
      {
        id: ExistUser._id,
        username:ExistUser.username,
        email: ExistUser.email,
        isAdmin: ExistUser.isAdmin,
      },
      process.env.JWT_TOKEN!,
      {
        expiresIn: "1d",
      }
    );
    const response = NextResponse.json({
      message: "User Login Successful",
      ExistUser: ExistUser,
      token,
    });
    // console.log(token);
    // Set the cookie with the token
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
