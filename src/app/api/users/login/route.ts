import connect from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does not Exists" },
        { status: 400 }
      );
    }

    const validPass = await bcryptjs.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json({ error: "Invalid Password!" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.email,
    };
    const token = jwt.sign(tokenData, process.env.ToKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
