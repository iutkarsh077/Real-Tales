"use client";
import MyHome from "@/components/myhome";
import Navbar from "@/components/navbar";
import UnAuthPage from "@/components/unauthPage";
import { useSession } from "next-auth/react";

const HomePage =  () => {
  const { data: session } = useSession();
  // console.log(session);
  if (session == null) return <UnAuthPage />;
  
  return (
    <>
      <Navbar/>
      <MyHome/>
    </>
  );
};

export default HomePage;
