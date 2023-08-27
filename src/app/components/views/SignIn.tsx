"use client"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { signIn } from "next-auth/react"

function SignIn() {
  return (
    <div className="text-center">
      <div className="text-center pt-16 pb-4">
        <h3 className="font-semibold">Sign in to try the demo</h3>
      </div>
      <button className="mx=auto" onClick={() => signIn("github")} type="button">
        Sign in with Github
      </button>
    </div>
  )
}

export default SignIn
