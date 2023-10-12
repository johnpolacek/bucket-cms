import Link from "next/link"
import { PageHeading } from "@/app/bucket/src/views/brand"

function Pricing() {
  return (
    <>
      <PageHeading>Pricing</PageHeading>
      <div className="p-8 bg-gray-100 rounded-[2rem] w-full max-w-[1040px] mx-auto my-12 text-left">
        <div className="grid grid-cols-2 py-12 gap-8 mx-auto relative -left-6">
          <div className="p-12 rounded-xl mb-6">
            <p className="text-5xl font-semibold text-gray-600 pb-2">Free</p>
            <h2 className="font-bold text-xl mb-4">for Non-Commercial Projects</h2>
            <p className="opacity-60">
              Bucket CMS is free forever to use on <span className="whitespace-nowrap">non-commercial projects.</span>
            </p>
            <a href="https://github.com/johnpolacek/bucket-cms/blob/main/LICENSE.md" className="inline-block bg-blue-500 text-white text-xl px-8 py-3 rounded-lg mt-8">
              View License
            </a>
          </div>
          <div className="pr-2">
            <Link href="/license" className="block p-12 rounded-xl mb-6 bg-blue-600 text-white hover:scale-105 cursor-pointer transition-all ease-in-out">
              <p className="text-5xl font-medium pb-2">
                <span className="font-light opacity-60">
                  <span className="text-xl opacity-70 relative -top-4 -left-px">$</span>
                  <span className="line-through">250</span>
                </span>{" "}
                <span className="text-xl opacity-70 relative -top-4 -left-px">$</span>
                <span className="font-semibold">100</span>
              </p>
              <h2 className="font-bold text-xl mb-4">per Commercial Project</h2>
              <p>Commercial licenses are currently available at a reduced price during this limited-time public beta.</p>
              <p className="text-sm opacity-70 pt-4">If you're not completely satisfied with your purchase, we offer a full refund within 30 days of your purchase date.</p>
              <div className="inline-block bg-white text-blue-600 text-xl px-8 py-3 rounded-lg mt-8">Purchase License</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing
