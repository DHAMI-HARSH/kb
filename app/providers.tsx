"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  User,
} from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "@/app/lib/firebase.client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔥 IMPORTANT: Prevent server/client mismatch
  if (loading) {
    return (
      <div style={{ color: "white", padding: "2rem", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: (email: string, password: string) =>
          signInWithEmailAndPassword(firebaseAuth, email, password),
        signUp: (email: string, password: string) =>
          createUserWithEmailAndPassword(firebaseAuth, email, password),
        signInWithGoogle: () =>
          signInWithPopup(firebaseAuth, googleAuthProvider),
        signOut: () => signOut(firebaseAuth),
        resetPassword: (email: string) =>
          sendPasswordResetEmail(firebaseAuth, email),
        getIdToken: () => user?.getIdToken() ?? Promise.resolve(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
