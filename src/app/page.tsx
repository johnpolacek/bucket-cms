import Link from "next/link"
import Header from "./demo/components/ui/header"
import GithubLink from "./demo/components/ui/github-link"
import { Button } from "./demo/components/ui/button"
import CLICommandCopy from "./demo/components/ui/cli-command-copy"

export default function Home() {
  return (
    <>
      <Header>
        <GithubLink />
      </Header>
      <main className="flex min-h-screen flex-col items-center gap-8 py-16 px-8">
        <h1 className="text-4xl font-light text-center text-blue-400">
          Sometimes, you don’t need a <strong>CMS</strong>.
        </h1>
        <h2 className="text-6xl font-extrabold -mt-6 text-blue-700 pb-4">How about a Bucket?</h2>
        <p className="text-lg opacity-70 max-w-[590px] text-center pb-8">Bucket is the world’s first portable drop-in CMS designed for Next.js (no database necessary)</p>
        <div className="grid grid-cols-2 gap-4 -mt-4">
          <div className="col-span-2">
            <CLICommandCopy commandText="npx create-bucket-cms" />
          </div>
          <Link href="/docs">
            <Button className="w-full bg-pink-500 text-white text px-6 py-3 h-auto hover:bg-pink-600 hover:scale-105 transition-all ease-in-out">Get Started</Button>
          </Link>
          <Link href="/demo">
            <Button className="w-full bg-blue-600 text-white text px-6 py-3 h-auto hover:bg-blue-700 hover:scale-105 transition-all ease-in-out">Try the Demo</Button>
          </Link>
        </div>

        <p className="pt-32 mt-32">Own your data. All of your requests and data stay with you.</p>
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
