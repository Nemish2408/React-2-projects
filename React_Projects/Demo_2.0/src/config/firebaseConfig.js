import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    setDoc, 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAClA-K9vxTnODI-e6Koev89p6q4q05qj4",
    authDomain: "fir-5a6ee.firebaseapp.com",
    projectId: "fir-5a6ee",
    storageBucket: "fir-5a6ee.firestorage.app",
    messagingSenderId: "518898969154",
    appId: "1:518898969154:web:e46d03e03140a736f81bdb",
    measurementId: "G-278T7S6E4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Function to save user data to Firestore with enhanced error handling
export const saveUserData = async (user, additionalData = {}) => {
    if (!user) throw new Error("No user provided");

    try {
        const userRef = doc(db, 'users', user.uid);
        
        // Prepare user data object
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            createdAt: new Date(),
            ...additionalData
        };

        // Use merge to avoid overwriting existing data
        await setDoc(userRef, userData, { merge: true });
        
        return userRef;
    } catch (error) {
        console.error("Error saving user data:", error);
        throw new Error(`Failed to save user data: ${error.message}`);
    }
};

// Enhanced authentication functions with more specific error handling
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await saveUserData(userCredential.user);
        return userCredential;
    } catch (error) {
        console.error("Sign in error:", error);
        
        // More specific error handling
        switch (error.code) {
            case 'auth/user-not-found':
                throw new Error('No user found with this email.');
            case 'auth/wrong-password':
                throw new Error('Incorrect password.');
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            case 'auth/user-disabled':
                throw new Error('This user account has been disabled.');
            default:
                throw new Error('Sign in failed. Please try again.');
        }
    }
};

export const signUp = async (email, password, additionalData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserData(userCredential.user, additionalData);
        return userCredential;
    } catch (error) {
        console.error("Sign up error:", error);
        
        // More specific error handling
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error('Email is already registered.');
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            case 'auth/weak-password':
                throw new Error('Password is too weak.');
            default:
                throw new Error('Sign up failed. Please try again.');
        }
    }
};

export const signInWithGoogleAuth = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        await saveUserData(result.user);
        return result;
    } catch (error) {
        console.error("Google Sign-In error:", error);
        
        // More specific error handling
        switch (error.code) {
            case 'auth/account-exists-with-different-credential':
                throw new Error('An account already exists with a different credential.');
            case 'auth/popup-blocked':
                throw new Error('Pop-up blocked. Please enable pop-ups.');
            case 'auth/popup-closed-by-user':
                throw new Error('Sign-in popup was closed.');
            default:
                throw new Error('Google Sign-In failed. Please try again.');
        }
    }
};

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Password reset email sent successfully';
    } catch (error) {
        console.error("Password reset error:", error);
        
        // More specific error handling
        switch (error.code) {
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            case 'auth/user-not-found':
                throw new Error('No user found with this email.');
            default:
                throw new Error('Password reset failed. Please try again.');
        }
    }
};

export { auth, app, db, analytics };