import React, { useState } from "react";
import { auth, googleProvider, RecaptchaVerifier } from "./firebaseConfing";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithPhoneNumber
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("User Registered:", userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("User Logged In:", userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("Google Sign-in:", result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      console.log("OTP Sent!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      console.log("Phone Login Successful:", result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User Logged Out");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Firebase Authentication</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <button onClick={handleSignup} style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "#fff" }}>
            Sign Up
          </button>
          <button onClick={handleLogin} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "#fff", marginTop: "5px" }}>
            Login
          </button>

          <button onClick={handleGoogleLogin} style={{ width: "100%", padding: "10px", backgroundColor: "red", color: "#fff", marginTop: "10px" }}>
            Sign in with Google
          </button>

          <input
            type="tel"
            placeholder="Phone Number (+123456789)"
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ display: "block", marginTop: "10px", width: "100%" }}
          />
          <button onClick={handleSendOtp} style={{ width: "100%", padding: "10px", backgroundColor: "orange", color: "#fff", marginTop: "5px" }}>
            Send OTP
          </button>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            style={{ display: "block", marginTop: "10px", width: "100%" }}
          />
          <button onClick={handleVerifyOtp} style={{ width: "100%", padding: "10px", backgroundColor: "purple", color: "#fff", marginTop: "5px" }}>
            Verify OTP
          </button>

          <div id="recaptcha-container"></div>
        </>
      ) : (
        <button onClick={handleLogout} style={{ width: "100%", padding: "10px", backgroundColor: "black", color: "#fff" }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthForm;
