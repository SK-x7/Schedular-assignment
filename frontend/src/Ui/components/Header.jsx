import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

function Header() {
    return (
        <>
        <div className="flex w-full bg-gray-400 justify-between items-center py-3 px-4">
            This is Header
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        </div>
        </>
    )
}

export default Header
