"use client";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);
  //login
  const handleSignInWithGoolgle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Signed in:", result);
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error?.message);
    }
    setIsLoading(false);
  };

  //logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth, new GoogleAuthProvider());
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        handleSignInWithGoolgle,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
