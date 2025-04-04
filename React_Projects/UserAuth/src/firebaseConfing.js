import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoWDFgfW9DZWcH3C9v_eIrIgDz4kBXC94",
  authDomain: "userauth-a1ed1.firebaseapp.com",
  projectId: "userauth-a1ed1",
  storageBucket: "userauth-a1ed1.firebasestorage.app",
  messagingSenderId: "481053278378",
  appId: "1:481053278378:web:4ca354a34d5ab512edd0d3",
  measurementId: "G-91VD5GK56R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier };
