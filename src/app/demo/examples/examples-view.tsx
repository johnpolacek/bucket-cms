import React from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"
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
              <CheckCircledIcon />
            </span>{" "}
            <span className="text-xl">Client Testimonials</span>
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Case Studies
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            FAQ Sections
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Featured Products
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Job Boards
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Portfolios
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            File Assets
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Feature Requests
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Contact Forms
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Team Bios
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Image Gallery
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Resource Library
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Events List
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Project Showcase
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Brand Pages
          </li>
          <li className="flex text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Author Profiles
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ExamplesView
