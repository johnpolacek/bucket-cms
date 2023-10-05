"use client"
import React, { useState } from "react"
import TransitionWrapper from "./TransitionWrapper"
import { Label, Input, Button } from "../../ui"
import Link from "next/link"

function CollectionItemNameSelect({ onSelect }: { onSelect: (itemName: string) => void }) {
  const [itemName, setItemName] = useState("")

  return (
    <TransitionWrapper>
      <div className="p-12 bg-white shadow rounded border w-full max-w-[640px] mx-auto mt-8 flex flex-col justify-center items-center gap-4">
        <Label htmlFor="itemName" className="block text-2xl font-bold text-blue-600 text-center max-w-[480px]">
          Choose a label to identify items in your collection
        </Label>
        <Input
          className="text-lg text-center h-auto py-3 max-w-[360px]"
          id="itemName"
          type="text"
          value={itemName}
          autoFocus={true}
          autoComplete="off"
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter name for item label"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (itemName) onSelect(itemName)
            }
          }}
        />
        <Button
          onClick={() => {
            if (itemName) onSelect(itemName)
          }}
          className="h-auto bg-blue-600 hover:bg-blue-700 hover:scale-105 px-8 py-3 text-xl mt-4"
        >
          Next <span className="font-thin scale-150 relative -top-[2px] left-3">»</span>
        </Button>
        <p className="text-sm text-center opacity-70 pt-4 max-w-[360px] mx-auto">Examples of collection item labels would be Name, Title, Full Name, Email, Product SKU, ID or Username.</p>
      </div>
      <div className="text-center py-8 text-blue-500">
        <Link href="../../">Cancel</Link>
      </div>
    </TransitionWrapper>
  )
}

export default CollectionItemNameSelect
