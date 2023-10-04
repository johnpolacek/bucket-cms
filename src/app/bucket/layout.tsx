import { getServerSession } from "next-auth/next"
import { options } from "./options"
import { BrandImage } from "./src/views/brand/BrandImage"
import { AdminFooter } from "./src/views/admin/AdminFooter"
import BucketProvider from "./src/views/providers/BucketProvider"

export default async function BucketLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options)

  return (
    <main className={`flex flex-col grow justify-center items-center relative w-full h-full`}>
      {session?.user?.name || process.env.NODE_ENV === "development" ? (
        <BucketProvider>{children}</BucketProvider>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center p-8 gap-2">
          <BrandImage />
          <p className="pb-8 italic opacity-70">Authentication required for access</p>
        </div>
      )}
      <AdminFooter showAuthenticationWarning={!session?.user?.name && process.env.NODE_ENV === "development"} />
    </main>
  )
}
