import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (adminOnly && user?.primaryEmailAddress?.emailAddress !== import.meta.env.VITE_ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>{children}</SignedIn>
    </>
  );
}
