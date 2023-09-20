"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import Header from "../ui/header"
import GithubLink from "../ui/github-link"
import { Button } from "../ui/button"
import Image from "next/image"
import { cn } from "../ui/utils"

function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className={cn("flex flex-col grow min-h-screen transition-all delay-100 duration-1000 ease-out opacity-100", isLoading && "opacity-0")}>
      <Header>
        <GithubLink />
      </Header>
      <div className="grow text-center bg-gray-50 py-12">
        <Image className="opacity-90 rounded-full overflow-hidden border border-blue-300 mx-auto mb-4" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
        <h2 className="text-4xl font-bold text-blue-800 pt-6 pb-2">Welcome to Bucket</h2>
        <p className="text-blue-800 opacity-70 font-medium pb-12">Please sign in with an authentication provider to access the demo</p>
        <Button
          disabled={isLoading}
          className={cn("h-auto hover:scale-105 transition-all ease-in-out", isLoading && "opacity-30")}
          onClick={() => {
            setIsLoading(true)
            console.log("signIn window.location.href " + window.location.href)
            signIn("github", { callbackUrl: window.location.href })
          }}
          type="button"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" aria-label="Github" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.095.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Sign in with Github
        </Button>
      </div>
    </div>
  )
}

export default SignIn
