"use client"
import React, { useState } from "react"
import Welcome from "./Welcome"
import CollectionForm from "./CollectionForm"

function Admin() {
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <main className="flex flex-col items-center bg-gray-100 py-12">
      {isCreatingCollection ? (
        <CollectionForm
          onCancel={() => setIsCreatingCollection(false)}
          onComplete={() => {
            setIsCreatingCollection(false)
          }}
        />
      ) : (
        <Welcome
          onCreateCollection={() => {
            setIsCreatingCollection(true)
          }}
        />
      )}
    </main>
  )
}

export default Admin
