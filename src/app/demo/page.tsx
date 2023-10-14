import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import { Metadata } from "next"
import SignIn from "./components/views/SignIn"
import { getSessionUser } from "../api/bucket/auth/get-session-user"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Bucket CMS | Contact",
}

export default async function Demo() {
  const sessionUser = await getSessionUser()
  if (sessionUser) {
    return redirect("/bucket/admin")
  }

  return (
    <main>
      <div className="py-12 px-8 border-t max-w-[480px] mx-auto text-center">
        <TransitionWrapper>
          <SignIn isTestEnv={process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"} />
        </TransitionWrapper>
      </div>
    </main>
  )
}
