"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type PageProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: PageProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
