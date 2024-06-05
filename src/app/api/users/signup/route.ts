import { NextRequest, NextResponse } from "next/server";
 
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import connectToDB from "@/server/db";

export async function POST(request:NextRequest) {
    try {
        await connectToDB();

   const reqBody= await request.json();
   const { username, email, password } =reqBody
        // console.log(reqBody);
        if (!username || !email || !password) {
            return NextResponse.json({
                message: "Please fill all the fields",
                }, {
                    status: 400,
            })
        }
       const ExistUser=await User.findOne({email});
    //    console.log(ExistUser);
       if (ExistUser) {
        return NextResponse.json({
            message: "Email Already Exist",
            }, {
                status: 400,
        })
       }
       const hashedPassword=await bcrypt.hash(password, 10);
       const newUser=new User({username, email, password:hashedPassword});
       const saveduser=  await newUser.save();
 
        return NextResponse.json({
            message:"User Register Successful",
            saveduser:saveduser,
        })
    } catch (error:any) {
       return NextResponse.json({
        error: error.message
       }) 
    }
}