"use client"
import React, { useState } from "react"
import TransitionWrapper from "./TransitionWrapper"
import { Label, Input, Button } from "../../ui"

function CollectionItemNameSelect({ onSelect }: { onSelect: (itemName: string) => void }) {
  const [itemName, setItemName] = useState("")

  return (
    <TransitionWrapper>
      <div className="p-12 bg-white rounded border w-full max-w-[640px] mx-auto mt-8 flex flex-col justify-center items-center gap-4">
        <Label htmlFor="itemName" className="block text-2xl font-bold text-blue-600 text-center max-w-[460px]">
          Choose a name for how you will label the items in your collection
        </Label>
        <Input className="text-lg text-center h-auto py-3 max-w-[360px]" id="itemName" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" />
        <Button onClick={() => onSelect(itemName)} className="h-auto bg-blue-600 hover:bg-blue-700 hover:scale-105 px-8 py-3 text-xl mt-4">
          Next <span className="font-thin scale-150 relative -top-[2px] left-3">»</span>
        </Button>
        <p className="text-sm text-center opacity-70 pt-8">Some examples of collection names are Case Study Title, Full Name, Product Name, Question or Speaker Name.</p>
      </div>
    </TransitionWrapper>
  )
}

export default CollectionItemNameSelect
