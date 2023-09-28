import React from "react"
import { CheckCircle } from "@/app/bucket/src/ui/icon/check-circle"
import TestimonialsSection from "./testimonials"

const ExamplesView: React.FC = () => {
  return (
    <section className="px-4 py-12 w-full max-w-[960px] mx-auto">
      <h3 className="text-4xl font-light italic text-blue-600 text-center pb-4">Perfect for...</h3>
      <div className="w-full flex flex-col justify-center gap-8">
        <div className="w-[720px] h-[360px] overflow-hidden rounded-xl bg-gray-100 mx-auto flex justify-center pt-8 border relative">
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-white via-blue-200 to-blue-900 opacity-10"></div>
          <div className="scale-90 -rotate-3 relative left-2 -top-12 pointer-events-none">
            <TestimonialsSection />
          </div>
        </div>
        <ul className="grid grid-cols-4 gap-2">
          <li className="flex text-lg gap-2 items-center whitespace-nowrap font-semibold">
            <span className="text-blue-500 scale-125">
              <CheckCircle />
            </span>{" "}
            <span className="text-xl">Client Testimonials</span>
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Case Studies
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            FAQ Sections
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Featured Products
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Job Boards
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Portfolios
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            File Assets
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Feature Requests
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Contact Forms
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Team Bios
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Image Gallery
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Resource Library
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Events List
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Project Showcase
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Brand Pages
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircle />
            </span>{" "}
            Author Profiles
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ExamplesView
