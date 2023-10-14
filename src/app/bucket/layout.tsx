import { getSessionUser } from "../api/bucket/auth/get-session-user"
import { BrandImage } from "./src/views/brand/BrandImage"
import { AdminFooter } from "./src/views/admin/AdminFooter"
import BucketProvider from "./src/views/providers/BucketProvider"
import SignIn from "../demo/components/views/SignIn"

export default async function BucketLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = await getSessionUser()

  const isLocalhostAuth = process.env.NODE_ENV === "development" && sessionUser?.name === "Localhost"
  const isAuthorized = (sessionUser && sessionUser.name !== "Localhost") || isLocalhostAuth

  return (
    <div className="flex flex-col grow justify-start items-center relative w-full h-full bg-white">
      {isAuthorized ? (
        <BucketProvider>{children}</BucketProvider>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center p-8 gap-2">
          <SignIn isTestEnv={process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"} />
        </div>
      )}
      <AdminFooter showAuthenticationWarning={isLocalhostAuth} />
    </div>
  )
}
