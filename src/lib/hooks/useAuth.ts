/**
 * Custom hook for accessing authentication context
 * 
 * This hook provides easy access to the authentication context throughout the application.
 * It returns an object containing:
 * - user: The current authenticated user or null
 * - loading: Boolean indicating if auth state is being determined
 * - signInWithGoogle: Function to trigger Google sign-in
 * - signOut: Function to sign out the current user
 * 
 * @example
 * ```tsx
 * const { user, loading, signInWithGoogle, signOut } = useAuth();
 * 
 * if (loading) return <LoadingSpinner />;
 * 
 * return user ? (
 *   <button onClick={signOut}>Sign Out</button>
 * ) : (
 *   <button onClick={signInWithGoogle}>Sign In with Google</button>
 * );
 * ```
 * 
 * @returns {AuthContextType} The authentication context object
 */

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => useContext(AuthContext);