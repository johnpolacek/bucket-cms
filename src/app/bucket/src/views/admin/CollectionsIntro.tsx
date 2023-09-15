"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../ui"
import CollectionForm from "./CollectionForm"

function CollectionsIntro({ onCreateFirstCollection }: { onCreateFirstCollection: () => void }) {
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <div className="py-16">
      {isCreatingCollection ? (
        <CollectionForm
          onCancel={() => setIsCreatingCollection(false)}
          onComplete={() => {
            setIsCreatingCollection(false)
            window.location.reload()
          }}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Image className="opacity-90 rounded-full overflow-hidden border-2 shadow-lg border-blue-200 mx-auto mb-4" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
          <h1 className="text-3xl font-bold opacity-80 mb-4">Welcome!</h1>
          <p className="text-xl opacity-60 mb-6 text-center">
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
        </div>
      )}
    </div>
  )
}

export default CollectionsIntro
