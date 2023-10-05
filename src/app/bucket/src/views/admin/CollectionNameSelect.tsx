"use client"
import React, { useState } from "react"
import { Label, Input, Button } from "../../ui"
import TransitionWrapper from "./TransitionWrapper"

function CollectionNameSelect({ onSelect }: { onSelect: (collectionName: string) => void }) {
  const [collectionName, setCollectionName] = useState("")

  return (
    <TransitionWrapper>
      <div className="p-12 bg-white shadow rounded border w-full max-w-[640px] mx-auto mt-8 flex flex-col justify-center items-center gap-4">
        <Label htmlFor="collectionName" className="block text-2xl font-bold text-blue-600">
          Enter a collection name
        </Label>
        <Input
          className="text-lg text-center h-auto py-3 max-w-[360px]"
          id="collectionName"
          type="text"
          autoComplete="off"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder=""
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSelect(collectionName)
            }
          }}
        />
        <Button onClick={() => onSelect(collectionName)} className="h-auto bg-blue-600 hover:bg-blue-700 hover:scale-105 px-8 py-3 text-xl mt-4">
          Next <span className="font-thin scale-150 relative -top-[2px] left-3">»</span>
        </Button>
        <p className="text-sm text-center opacity-70 pt-8">Some examples of collection names are Case Studies, Testimonials, Featured Products, FAQs or Speaker Profiles</p>
      </div>
    </TransitionWrapper>
  )
}

export default CollectionNameSelect
