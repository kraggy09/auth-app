"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [button, setButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      userData.username.length > 0
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [userData]);
  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", userData);
      console.log("Signup success", res);
      console.log("Bla bla bla");
      router.push("/login");
      return;
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen p-2">
      <h1 className="text-2xl">{!loading ? "Signup " : "Processing"}</h1>
      <br />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSignup();
        }}
        className="flex flex-col  "
      >
        <span className="flex flex-col">
          {" "}
          <label htmlFor="username">UserName</label>
          <input
            className="bg-gray-500 rounded-lg outline-none pl-3"
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
          />
        </span>
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
          {" "}
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
          SignUp Here
        </button>
        <Link className="text-center mt-6" href={"/login"}>
          Already Registered?Login
        </Link>
      </form>
    </div>
  );
}
