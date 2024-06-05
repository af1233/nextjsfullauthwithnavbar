 
import getdatafromToken from "@/helpers/getdatafromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
   const userID=   await getdatafromToken(request);
   const findeUser=  await User.findOne({_id:userID}).select("-password");
    return NextResponse.json({
        message:"user Found",
        data:findeUser,
    })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            }, {
                status: 400,
        })
    }
}