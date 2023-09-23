"use client"
import React, { useEffect, useState, useRef } from "react"
import { CollectionFetch } from "../../types"
import DevHomeNav from "./DevHomeNav"
import Docs from "./Docs"

function DevHome() {
  const [collections, setCollections] = useState<CollectionFetch[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("")
  const scrollableDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/bucket/collections/read")
        if (!response.ok) {
          // throw new Error("Failed to fetch collections")
        } else {
          const data = await response.json()
          setCollections(data.collections)
        }
      } catch (error: any) {
        setError(error.message)
      }
    }
    fetchCollections()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const scrollDiv = scrollableDivRef.current
        const sections = scrollDiv.querySelectorAll("section[id]")

        let currentSectionId = ""

        if (Math.abs(sections[0].getBoundingClientRect().top - scrollDiv.getBoundingClientRect().top) < 100) {
          // Using a threshold of 100 pixels
          // The first section is at the top of the scrollable container
          currentSectionId = sections[0].id
        } else {
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect()
            const scrollDivRect = scrollDiv.getBoundingClientRect()

            if (rect.top >= scrollDivRect.top && rect.bottom <= scrollDivRect.bottom) {
              // The entire section is in view
              currentSectionId = section.id
            } else if (rect.top <= scrollDivRect.bottom / 2 && rect.bottom >= scrollDivRect.top / 2) {
              // Middle of the section is in view
              currentSectionId = section.id
            }
          })
        }

        if (currentSectionId) {
          setActiveSection(currentSectionId)
        }
      }
    }

    const scrollDiv = scrollableDivRef.current
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll)
      return () => {
        scrollDiv.removeEventListener("scroll", handleScroll)
      }
    }
  }, [scrollableDivRef?.current])

  return (
    <div className="flex w-full h-screen overflow-auto">
      <DevHomeNav collections={collections} activeSection={activeSection} />
      <div className="grow min-h-screen overflow-auto scroll-smooth" ref={scrollableDivRef}>
        <div className="py-16 max-w-[960px] mx-auto">
          <Docs collections={collections} />
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default DevHome
