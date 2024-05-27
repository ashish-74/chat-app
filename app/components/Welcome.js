import React, {useState} from "react";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Welcome = ({ setIsAuth, showOtpBox, otp, setOtp, userName, setUserName, setShowOtpBox }) => {

  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [confirmObj, setConfirmObj] = useState("");

  const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const verifyOtp = async () => {
    if (otp.length === 6) {
      try {
        await confirmObj.confirm(otp);
        setIsAuth(true);
      } catch(err){
        console.log(err);
      }
    }
  }

  const handleGetOtp = async (e) => {
    if (number.length !== 10 || isNaN(number))
      return setError("Invalid number! Please type a valid 10-digit mobile number.");
      try {
        setError("")
        const mobile = `+91 ${number}`;
        e.preventDefault();
        const response = await setUpRecaptcha(mobile);
        setConfirmObj(response);
        setShowOtpBox(true);
      } catch (err) {
        console.log(err);
      }
  };

  const handleMobileInput = (e) => {
    const input = e.target.value;
    const cleanInput = input.replace(/\D/g, "");
    setNumber(cleanInput);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="welcome">
      <h2>Welcome to Chat App !</h2>
      <p>Sign in to chat</p>
      <button className="sign-in" onClick={googleSignIn}>
        Sign in with Google
      </button>
      <h5 className="orMsg">----- OR -----</h5>
      <p>Sign in with Phone</p>
      <input required type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)}/><br />
      <input
        required
        value={number}
        onChange={handleMobileInput}
        placeholder="Phone number"
      />
      {!showOtpBox && <div className="captcha" id="recaptcha-container"></div>}
      {!showOtpBox && <button className="sign-in" onClick={handleGetOtp}>Get OTP</button>}
      {error && <p className="error">{error}</p>}
      <br />
      {showOtpBox && <input
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      />}
      <button className="login" onClick={verifyOtp}>
        Login
      </button>
    </main>
  );
};

export default Welcome;
