import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { checkBackendConnection, handleUser } from "../../apis/userApi";

function Header() {
  const { user, isLoaded } = useUser(); // Always call useUser() unconditionally
  
  // Always call useEffect() unconditionally as well
  useEffect(() => {
    if (isLoaded && user) {
      console.log("User data:", user);
      localStorage.setItem("userClerkId",user.id);
      handleUser(user); // Handle the user once loaded
    }
  }, [isLoaded, user]); // Dependencies for when isLoaded or user changes

  // Ensure rendering is conditional only on the UI, not hooks
  if (!isLoaded) return <div>Loading...</div>; // Show loading or nothing while user data is being fetched

  return (
    <>
      <div className="flex w-full bg-gray-400 justify-between items-center py-3 px-4 h-[8%]">
        This is Header
        <button
          onClick={(e) => {
            e.preventDefault();
            checkBackendConnection();
          }}
        >
          Check backend connectivity
        </button>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}

export default Header;
