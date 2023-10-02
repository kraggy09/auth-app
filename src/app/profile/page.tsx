"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const [userData, setUserData] = useState("");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetail = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data.data._id);
    setUserData(response.data.data._id);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div>
      ProfilePage
      <hr />
      <Link href={`/profile/${userData}`}>{userData}</Link>
      <button onClick={logout} className="bg-green-500 text-white mt-4">
        Logout
      </button>
    </div>
  );
}
