'use client';
import { useSession, signIn, signOut } from "next-auth/react";

export default function UnAuthPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to RealTales</h1>
      {session ? (
        <>
          <p className="mb-4">Signed in as {session.user.email}</p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600" onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p className="mb-4">Not signed in</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
