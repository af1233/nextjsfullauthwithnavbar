import  jwt  from 'jsonwebtoken';
import { NextRequest } from "next/server";
 
const getdatafromToken=async(request:NextRequest)=>{
    try {
        const token=request.cookies.get("token")?.value ||  "";
        const decodedToken:any=jwt.verify(token, process.env.JWT_TOKEN!);
        return decodedToken.id;

    } catch (error:any) {
        throw new Error(error.message)
    }

}

export default getdatafromToken;