import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <p>Sometimes you don’t need a CMS. How about a Bucket?</p>
      <p>Bucket is the world’s first portable drop-in CMS, no database necessary.</p>
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
  )
}
