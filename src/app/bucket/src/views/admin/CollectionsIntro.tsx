"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { BrandImage } from "../brand/BrandImage"
import { Button } from "../../ui"
import CollectionForm from "./CollectionForm"
import { Transition } from "@headlessui/react"

function CollectionsIntro() {
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        setIsCreatingCollection(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="py-16">
      {isCreatingCollection ? (
        <CollectionForm />
      ) : (
        <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" className="flex flex-col items-center gap-4">
          <BrandImage />
          <h1 className="text-3xl font-bold opacity-80 mb-4">Welcome!</h1>
          <p className="text-xl opacity-60 mb-2 text-center">
            You haven't created any collections yet.
            <br />
            Start by creating your first collection to organize and manage your content.
          </p>

          <Button
            onClick={() => {
              setIsCreatingCollection(true)
            }}
            size="lg"
            className="bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all ease-in-out text-xl h-auto py-4"
          >
            + Create Your First Collection
          </Button>

          <div className="mt-16 text-gray-500 italic text-lg">
            Got questions? Check out{" "}
            <Link className="text-blue-500" href="/docs">
              the docs
            </Link>{" "}
            and come back!
          </div>
        </Transition>
      )}
    </div>
  )
}

export default CollectionsIntro
