"use client";
import { useSession } from "next-auth/react";
import { MdHome } from "react-icons/md";
import { MdLocalPostOffice } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);
  const avatar = session?.user?.image;

  return (
    <div className="flex min-w-screen justify-between h-16 bg-blue-600">
      <div className="w-1/3 flex items-center pl-12 text-xl text-black font-bold underline">
        <Link href="/home">RealTales</Link>
      </div>
      <ul className="flex justify-around w-2/3 items-center">
        <li className="hover:cursor-pointer hover:text-black hover:ease-in-out text-3xl">
          <Link href="/home">
            <MdHome />
          </Link>
        </li>
        <li className="hover:cursor-pointer hover:text-black hover:ease-in-out text-3xl">
          <Link href="/new-post">
            <MdLocalPostOffice />
          </Link>
        </li>
        <li className="hover:cursor-pointer hover:text-black hover:ease-in-out">
          <Link href="/profile">
            <div className="w-8">
              {avatar ? (
                <img className="rounded-2xl" src={avatar} alt="profile photo" />
              ) : (
                <CgProfile />
              )}
            </div>
          </Link>
        </li>
        {session ? (
          <li onClick={() => signOut()} className="hover:cursor-pointer hover:text-black hover:ease-in-out text-3xl">
            <FiLogOut/>
          </li>
        ) : (
          <li className="hover:cursor-pointer hover:text-black hover:ease-in-out text-3xl">
            Sign Up
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
