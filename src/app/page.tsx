import Link from "next/link"
import Header from "./demo/components/ui/header"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-light text-center text-black opacity-60">Sometimes, you don’t need a CMS.</h1>
        <h2 className="text-6xl font-extrabold -mt-6 text-[#1e7898] pb-4">How about a Bucket?</h2>
        <p className="text-lg opacity-70">Bucket is the world’s first portable drop-in CMS, no database necessary.</p>
        <p>Own your data. All requests and all data stay with you.</p>
        <p>You own the CMS. The content, the files, the APIs are all yours and live on your system. You can even name the CMS whatever you want.</p>
        <p>Automatically generated documentation for developers to create custom components to display your data.</p>
        <p>Bucket CMS brings you the flexibility of a flat file JSON database meets the TypeScript-first schema validation of Zod.</p>
        <div className="text-center">
          <p className="pb-4">Try the admin interface</p>
          <Link className="text-blue-700 underline" href="/demo">
            Go to Demo
          </Link>
        </div>
      </main>
    </>
  )
}
