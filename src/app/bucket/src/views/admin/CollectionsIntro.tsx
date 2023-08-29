"use client"
import React, { useState } from "react"
import { Button } from "../../ui"
import CollectionForm from "./CollectionForm"

function CollectionsIntro({ onCreateFirstCollection }: { onCreateFirstCollection: () => void }) {
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <>
      {isCreatingCollection ? (
        <CollectionForm
          onCancel={() => setIsCreatingCollection(false)}
          onComplete={() => {
            setIsCreatingCollection(false)
          }}
        />
      ) : (
        <>
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
            className="text-xl h-auto py-4"
          >
            + Create Your First Collection
          </Button>

          <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto mt-16">
            <h2 className="text-3xl font-bold opacity-80 mb-6">What is a Collection?</h2>
            <p className="opacity-60 mb-4">
              A <strong className="font-semibold">Collection</strong> represents a curated set of content, structured and organized for a specific purpose or theme. Think of it as a customizable
              container where you can group various components together, arrange them in a specific layout, and present them cohesively.
            </p>

            <h3 className="text-2xl font-semibold opacity-70 mt-6 mb-4">Key Aspects of a Collection:</h3>

            <ul className="list-disc pl-5 opacity-60">
              <li className="mb-3">
                <strong>Components:</strong> A collection is composed of individual components, such as blocks of rich text content, images, videos, or even custom elements like brand headers. Each
                component has its own unique properties and data requirements, ensuring flexibility in content presentation.
              </li>
              <li className="mb-3">
                <strong>Layout:</strong> The layout of a collection defines how its components are visually arranged. Whether you want a single column of text, a grid of images, or a mix of different
                components side by side, the layout gives you the power to design the content's flow and appearance.
              </li>
              <li className="mb-3">
                <strong>Purpose:</strong> Collections can serve various purposes. For instance, an "Article" collection might combine text blocks, images, and videos to form a blog post. In contrast,
                a "Brand Page" collection could comprise brand headers, product galleries, and promotional videos.
              </li>
              <li>
                <strong>Extensibility:</strong> The system is designed to grow with your needs. Beyond the default components, you can register custom components tailored to specific requirements,
                allowing collections to evolve and adapt over time.
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default CollectionsIntro
