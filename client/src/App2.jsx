import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

export default function App() {
  const { getToken, isSignedIn, userId } = useAuth();

  const showToken = async () => {
    const token = await getToken({ template: "Shailesh" });

  };

  if (isSignedIn) {
    showToken(); // This will print token whenever user signs in
  }

  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
