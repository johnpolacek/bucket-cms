import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <p>Sometimes you don’t need a CMS. How about a Bucket?</p>
      <p>Bucket is the world’s first portable drop-in CMS, no database required.</p>
      <p>Own your data. All requests and all data stay on your existing infrastructure.</p>
      <p>Automatically generated documentation of your content schema for developers to create custom components</p>
      <div className="text-center">
        <p className="pb-4">Try the admin interface</p>
        <Link className="text-blue-700 underline" href="/demo">
          Go to Demo
        </Link>
      </div>
    </main>
  )
}
