import { getServerSession } from "next-auth/next"
import { options } from "./options"
import React from "react"
import { BrandImage } from "./src/views/brand/BrandImage"
import { AdminFooter } from "./src/views/admin/AdminFooter"

export default async function BucketLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)

  return (
    <main>
      {session?.user?.name || process.env.NODE_ENV === "development" ? (
        <>{children}</>
      ) : (
        <div className="w-screen h-screen flex flex-col items-center p-8 gap-2">
          <BrandImage />
          <p className="pb-8 italic opacity-70">Must be signed in to access Bucket</p>
        </div>
      )}
      <AdminFooter />
    </main>
  )
}
