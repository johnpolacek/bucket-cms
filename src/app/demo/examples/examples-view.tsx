"use client"
import React, { useEffect, useState } from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { CaseStudies, Testimonials, FAQ, FeaturedProducts } from "../examples"

const ExamplesView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const NUM_EXAMPLES = 4

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % NUM_EXAMPLES)
    }, 2500)

    return () => clearInterval(intervalId) // Clean up the interval on component unmount
  }, [])

  return (
    <section className="px-4 py-12 w-full max-w-[960px] mx-auto">
      <h3 className="text-4xl font-light italic text-blue-600 text-center pb-4">Perfect for...</h3>
      <div className="w-full flex flex-col justify-center gap-8">
        <div className="w-full h-[160px] md:w-[720px] sm:h-[270px] md:h-[360px] overflow-hidden rounded-xl bg-gray-100 mx-auto flex justify-center pt-8 border relative">
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-white via-blue-200 to-blue-900 opacity-10"></div>
          <div
            className={`${
              currentIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            } transition-all duration-1000 scale-[.4] sm:scale-90 -rotate-3 absolute sm:-left-12 -top-[140px] sm:-top-4 pointer-events-none`}
          >
            <Testimonials />
          </div>
          <div
            className={`${
              currentIndex === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            } transition-all duration-1000 scale-[.375] sm:scale-[.85] rotate-3 absolute -left-[330px] -top-[380px] sm:-top-32 pointer-events-none`}
          >
            <CaseStudies />
          </div>
          <div
            className={`${
              currentIndex === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
            } transition-all duration-1000 scale-[.3] sm:scale-[.66] -rotate-3 absolute -left-[120px] sm:-left-32 -top-12 pointer-events-none w-full h-full`}
          >
            <div className="absolute -top-16 -left-4 w-[1280px]">
              <FAQ />
            </div>
          </div>
          <div
            className={`${
              currentIndex === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
            } transition-all duration-1000 scale-[.43] sm:scale-90 rotate-3 sm:rotate-1 absolute -left-[248px] sm:left-0 -top-[438px] sm:-top-16 pointer-events-none`}
          >
            <FeaturedProducts />
          </div>
        </div>
        <ul className="flex flex-wrap items-center md:grid grid-cols-4 gap-2">
          <li className="flex w-full justify-center md:justify-start text-lg gap-2 items-center whitespace-nowrap">
            <span className={`text-blue-500 transition-all duration-1000 ease-in-out ${currentIndex === 0 ? "scale-125" : "scale-100"}`}>
              <CheckCircledIcon />
            </span>{" "}
            <span className={`transition-all duration-1000 ease-in-out ${currentIndex === 0 ? "text-3xl md:text-xl font-semibold" : "text-xl md:text-lg font-normal"}`}>Client Testimonials</span>
          </li>
          <li className="flex w-full justify-center md:justify-start text-lg gap-2 items-center whitespace-nowrap">
            <span className={`text-blue-500 transition-all duration-1000 ease-in-out ${currentIndex === 1 ? "scale-125" : "scale-100"}`}>
              <CheckCircledIcon />
            </span>{" "}
            <span className={`transition-all duration-1000 ease-in-out ${currentIndex === 1 ? "text-3xl md:text-xl font-semibold" : "text-xl md:text-lg font-normal"}`}>Case Studies</span>
          </li>
          <li className="flex w-full justify-center md:justify-start text-lg gap-2 items-center whitespace-nowrap">
            <span className={`text-blue-500 transition-all duration-1000 ease-in-out ${currentIndex === 2 ? "scale-125" : "scale-100"}`}>
              <CheckCircledIcon />
            </span>{" "}
            <span className={`transition-all duration-1000 ease-in-out ${currentIndex === 2 ? "text-3xl md:text-xl font-semibold" : "text-xl md:text-lg font-normal"}`}>FAQ Sections</span>
          </li>
          <li className="pb-4 md:pb-0 flex w-full justify-center md:justify-start text-lg gap-2 items-center whitespace-nowrap">
            <span className={`text-blue-500 transition-all duration-1000 ease-in-out ${currentIndex === 3 ? "scale-125" : "scale-100"}`}>
              <CheckCircledIcon />
            </span>{" "}
            <span className={`transition-all duration-1000 ease-in-out ${currentIndex === 3 ? "text-3xl md:text-xl font-semibold" : "text-xl md:text-lg font-normal"}`}>Featured Products</span>
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Job Boards
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Portfolios
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            File Assets
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Feature Requests
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Contact Forms
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Team Bios
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Image Gallery
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Resource Library
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Events List
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Project Showcase
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
            <span className="text-blue-500">
              <CheckCircledIcon />
            </span>{" "}
            Brand Pages
          </li>
          <li className="w-[45%] md:w-auto relative sm:left-[10%] md:left-0 sm:scale-105 md:scale-100 flex text-base sm:text-lg gap-2 items-center whitespace-nowrap">
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
