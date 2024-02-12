"use client";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const UserContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [loggedInAccount, setLoggedInAccount] = useState(false);
  const [userData, setUserData] = useState([]);
  const [singlePost, setSinglePost] = useState([]);

  useEffect(() => {
    const handleAccount = async () => {
      if (loggedInAccount === false && session != null) {
        try {
          // console.log(session);
          const res = await fetch("/api/account/createAccount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user.name,
              username: session.user.username,
              uid: session.user.uid,
              avatar: session.user.image || "",
            }),
          });
          const data = await res.json();
          // console.log(data);
          setUserData(data);
          setLoggedInAccount(true);
        } catch (error) {
          console.error("Error creating account:", error);
        }
      }
    };

    handleAccount();
  }, [loggedInAccount, session]);

  return (
    <UserContext.Provider value={{ loggedInAccount, setLoggedInAccount, userData, singlePost, setSinglePost }}>
      {children}
    </UserContext.Provider>
  );
};

export default GlobalContextProvider;
