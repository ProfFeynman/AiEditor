/**
 * Authentication Context Module
 * 
 * This module provides authentication state and methods throughout the application using React Context.
 * It wraps Firebase Authentication and provides a simplified interface for:
 * - User state management
 * - Google Sign-in
 * - Sign-out functionality
 * - Loading state during authentication
 */

"use client";

import React, { createContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";

/**
 * Interface defining the shape of the authentication context
 */
interface AuthContextType {
  /** Current authenticated user or null if not authenticated */
  user: User | null;
  /** Loading state during authentication checks */
  loading: boolean;
  /** Function to trigger Google sign-in */
  signInWithGoogle: () => Promise<void>;
  /** Function to sign out the current user */
  signOut: () => Promise<void>;
}

/**
 * Authentication Context with default values
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state and methods to all children
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Initiates Google sign-in process using Firebase popup
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  /**
   * Signs out the current user
   */
  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
