import { Bucket } from "."
import Image from "next/image"

export default async function Home() {
  return (
    <main>
      {process.env.NODE_ENV === "development" ? (
        <Bucket />
      ) : (
        <div className="w-screen h-screen flex flex-col items-center p-8 gap-2">
          <Image className="opacity-90 rounded-full overflow-hidden border-2 shadow-lg border-blue-200 mx-auto" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
          <p className="pb-8 italic opacity-70">Your configuration of Bucket is currently set up to only run on your local development environment.</p>
          <p className="font-bold">To host Bucket in production, set it up on a page that requires authentication.</p>
          <p className="font-bold">
            See{" "}
            <a className="text-blue-600 underline" href="https://github.com/johnpolacek/bucket-cms/blob/main/src/app/bucket/page-secure.tsx">
              this example.
            </a>
          </p>
        </div>
      )}
    </main>
  )
}
