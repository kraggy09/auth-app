"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast/headless";

interface UserData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [button, setButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData.email.length > 0 && userData.password.length > 0) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [userData]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", userData);
      console.log("Login Success", res.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen p-2">
      <h1 className="text-2xl">{loading ? "Processing" : "Login"}</h1>
      <br />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onLogin();
        }}
        className="flex flex-col  "
      >
        <span className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-500 rounded-lg outline-none pl-3"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-500 rounded-lg outline-none pl-3"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </span>
        <button disabled={button} className="bg-green-400 mt-6 rounded-xl py-2">
          Login Here
        </button>
        <Link className="text-center mt-6" href={"/signup"}>
          Not Registered?SignUp
        </Link>
      </form>
    </div>
  );
}
