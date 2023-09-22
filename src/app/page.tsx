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
        <h1 className="text-3xl font-light text-center text-blue-500 pb-2">Maybe you don’t need a big cloud CMS</h1>
        <h2 className="text-6xl font-extrabold -mt-6 text-blue-700 pb-4">How about a Bucket?</h2>
        <p className="text-lg opacity-70 max-w-[700px] text-center px-4 pb-8">Bucket is the world’s first portable drop-in headless CMS designed for Next.js (no database necessary)</p>
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

        <div className="grid grid-cols-2 pt-8 my-16 max-w-[1000px] mx-auto px-4">
          <div className="flex flex-col gap-8 justify-center pb-8 pr-12">
            <h3 className="text-3xl font-bold text-blue-600">The Drop-In Headless CMS: No Database, No Problem.</h3>
            <p className="text-lg opacity-70">
              Introducing the drop-in headless CMS experience for Next.js. On-the-fly data schema. Type-safe validation with Zod. Automatically generated documentation. Streamlined development.
            </p>
          </div>
          <div className="w-[640px] border-4 border-blue-100 rounded-lg overflow-hidden mx-auto opacity-80">
            <video className="scale-[1.33]" width="100%" height="100%" loop muted autoPlay playsInline>
              <source src="https://s3.amazonaws.com/bucket-cms/bucket-cms-create-collection.mp4" type="video/mp4" />
              <img
                src="https://s3.amazonaws.com/bucket-cms/create-bucket-cms-cli.jpg"
                alt="The npx create-bucket-cms terminal command ads bucket cms to your Next.js project"
                width="1041 "
                height="599"
              />
            </video>
          </div>
        </div>

        <div className="grid grid-cols-3 pt-8 my-16 max-w-[1300px] mx-auto px-4">
          <div className="w-[640px] col-span-2 border-4 border-blue-100 rounded-lg overflow-hidden mx-auto opacity-80">
            <video width="100%" height="100%" loop muted autoPlay playsInline>
              <source src="https://s3.amazonaws.com/bucket-cms/bucket-cms-own-your-data.mp4" type="video/mp4" />
              <img
                src="https://s3.amazonaws.com/bucket-cms/create-bucket-cms-cli.jpg"
                alt="The npx create-bucket-cms terminal command ads bucket cms to your Next.js project"
                width="1041 "
                height="599"
              />
            </video>
          </div>
          <div className="flex flex-col gap-8 justify-center pb-8 -ml-8 pr-4 items-end">
            <h3 className="text-3xl font-bold text-blue-600">Break Free from the Cloud and Own Your Data</h3>
            <p className="text-lg opacity-70">
              Will Bucket CMS, the admin experience lives in your project, not in the cloud. No monthly fees. All your data, stored securely on your own S3 bucket as structured flat file JSON data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 pt-8 my-16 max-w-[1000px] mx-auto px-4">
          <div className="flex flex-col gap-8 justify-center pb-8 pr-12">
            <h3 className="text-3xl font-bold text-blue-600">
              Integrate Bucket CMS <br />
              into your Next.js project with a single command
            </h3>
            <p className="text-lg opacity-70">Our CLI tool automates the setup process, providing you with intelligent default settings tailored to your project.</p>
          </div>
          <div className="w-[640px] p-4 bg-black rounded-lg overflow-hidden mx-auto opacity-80">
            <video width="100%" height="100%" loop muted autoPlay playsInline>
              <source src="https://s3.amazonaws.com/bucket-cms/create-bucket-cms-demo.mp4" type="video/mp4" />
              <img
                src="https://s3.amazonaws.com/bucket-cms/create-bucket-cms-cli.jpg"
                alt="The npx create-bucket-cms terminal command ads bucket cms to your Next.js project"
                width="1041 "
                height="599"
              />
            </video>
          </div>
        </div>
      </main>
    </>
  )
}
