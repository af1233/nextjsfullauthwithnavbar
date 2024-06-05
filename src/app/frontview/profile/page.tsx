"use client"
import axios from "axios";
import { useEffect, useState } from "react";
const ProfilePage = () => {
    const [user, setUser]=useState<any>({});

     const getUserData=async()=>{
        try {
            const res=await axios.get("/api/users/me")
            console.log(res.data);
            setUser(res.data.data)
        } catch (error:any) {
            console.log(error.message);
        }
     }
     useEffect(()=>{
        getUserData()
     },[])

  return (
    <div className="h-dvh">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-2">{user.username}</h1>
      <p className="text-gray-600">{user.email}</p>
    </div>
    </div>
  )
}

export default ProfilePage;