import React from "react";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";

const NavBar = () => {

  const [user] = useAuthState(auth);
  
  const signOut = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <nav className="nav-bar">
      <h1>ChatApp !</h1>
      {user && (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default NavBar;
