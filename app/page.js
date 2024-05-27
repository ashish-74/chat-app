'use client'

import React, {useState, useEffect} from "react";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import "./page.css";

import { setupNotifications } from './firebase-config';
import { toastNotification, sendNativeNotification } from './components/helpers';
import useVisibilityChange from './components/useVisibilityChange';
import { register } from './components/serviceWorker';

export default function Home() {

  const isForeground = useVisibilityChange();

  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setupNotifications((message) => {
      if (isForeground) {
        // App is in the foreground, show toast notification
        toastNotification({
          title,
          description: body,
          status: "info",
        });
      } else {
        // App is in the background, show native notification
        sendNativeNotification({
          title,
          body,
        });
      }
    });
  }, []);

  register();

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
