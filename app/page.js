'use client'

import React, {useState, useEffect} from "react";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import "./page.css";

export default function Home() {

  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="App">
      <NavBar />
      {!user ? (
        <Welcome showOtpBox={showOtpBox} otp={otp} setOtp={setOtp} userName={userName} setUserName={setUserName} setShowOtpBox={setShowOtpBox} />
      ) : (
        <>
          <ChatBox userName={userName} />
        </>
      )}
    </div>
  );
}
