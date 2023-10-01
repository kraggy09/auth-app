import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authorisation",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
