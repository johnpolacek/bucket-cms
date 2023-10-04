import Link from "next/link"
import Footer from "./demo/components/ui/footer"
import { Button } from "./demo/components/ui/button"
import CLICommandCopy from "./demo/components/ui/cli-command-copy"
import ExamplesView from "./demo/examples/examples-view"

export default function Home() {
  const textWrapBalance: any = { textWrap: "balance" }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-6 sm:gap-8 py-8 sm:py-20 px-2 sm:px-8 mb-8" style={textWrapBalance}>
        <h1 className="text-base sm:text-xl md:text-3xl font-light text-center text-blue-500 pb-2">Maybe you don’t need a big cloud CMS...</h1>
        <h2 className="text-4xl sm:text-6xl text-center font-extrabold -mt-6 text-blue-700">How about a Bucket?</h2>
        <p className="sm:text-xl opacity-70 max-w-[960px] text-center px-4 pb-8 leading-normal sm:-mt-4">
          Bucket is the world’s first AI-Powered Portable Drop-in Headless CMS designed for Next.js <span className="italic block">(no database necessary)</span>
        </p>
        <div className="grid grid-cols-2 gap-4 -mt-4 scale-[.8] sm:scale-100">
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

        <div className="md:grid grid-cols-2 sm:pt-16 my-4 md:my-8 w-full max-w-[1000px] mx-auto px-4 md:px-8 relative md:-left-[4%]">
          <div className="md:flex flex-col gap-4 md:gap-8 justify-center pb-8 md:pr-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center md:text-left">
              The Drop-In Headless CMS: <br />
              No Database, No Problem
            </h3>
            <p className="pt-6 pl-2 md:pt-0 md:pl-0 md:text-lg opacity-70">
              Introducing an AI-Driven Drop-in Headless CMS experience for Next.js. On-the-fly data schema. Type-safe validation with Zod. Automatically generated documentation. Streamlined
              development.
            </p>
          </div>
          <div className="w-full md:w-[640px] border-4 border-blue-100 rounded-lg overflow-hidden mx-auto opacity-80">
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

        <ExamplesView />

        <div className="md:grid grid-cols-3 md:pt-8 md:my-8 max-w-[1300px] mx-auto px-4 relative -left-[2%]">
          <div className="w-full md:w-[640px] col-span-2 border-4 border-blue-100 rounded-lg overflow-hidden mx-auto opacity-80">
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
          <div className="flex flex-col gap-4 md:gap-8 justify-center pb-8 pt-4 md:pt-0 md:-ml-8 pr-4 items-end">
            <h3 className="text-2xl sm:text-3xl text-center md:text-left font-bold text-blue-600">Break Free from the Cloud and Own Your Data</h3>
            <p className="md:text-lg pl-2 md:pl-0 opacity-70">
              With Bucket CMS, the admin experience lives in your project, not in the cloud. No monthly fees. All of your data gets stored securely on your own S3 bucket as structured data.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 md:pt-8 md:my-8 max-w-[1000px] mx-auto px-4 relative md:-left-[4%]">
          <div className="flex flex-col gap-8 justify-center pt-4 md:pt-8 pb-8 md:pr-12">
            <h3 className="text-2xl sm:text-3xl text-center md:text-left font-bold text-blue-600">
              Integrate Bucket CMS <br />
              into your Next.js project with a single command
            </h3>
            <p className="md:text-lg opacity-70 pl-2 md:pl-0">Our CLI tool automates the setup process, providing you with intelligent default settings tailored to your project.</p>
          </div>
          <div className="w-full md:w-[640px] p-4 bg-black rounded-lg overflow-hidden mx-auto opacity-80">
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
      <Footer />
    </>
  )
}
