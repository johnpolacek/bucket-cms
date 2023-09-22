"use client"
import React, { useState } from "react"
import { Input, Button, Label, Switch } from "../../ui"
import TransitionWrapper from "./TransitionWrapper"
import { EditIcon } from "../../ui/icon/edit"
import { CheckIcon } from "@radix-ui/react-icons"

function CollectionNameEdit({ initialValue, onChange }: { initialValue: string; onChange: (collectionName: string) => void }) {
  const [collectionName, setCollectionName] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex relative pb-8">
      {isEditing ? (
        <TransitionWrapper className="relative">
          <Input
            className="w-[486px] text-2xl sm:text-4xl text-primary h-auto font-semibold text-center bg-transparent border-t-0 border-l-0 border-r-0 border-b-blue-200 rounded-none focus-visible:ring-0"
            name="collectionName"
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
            autoFocus={true}
          />
        </TransitionWrapper>
      ) : (
        <TransitionWrapper>
          <div className="relative">
            <h3 className="text-2xl sm:text-4xl font-semibold pt-2 pb-1 text-primary">{collectionName}</h3>
            <Button onClick={() => setIsEditing(true)} variant="ghost" className="scale-90 px-1 absolute -top-2 -right-8 opacity-50" aria-label="Edit collection name">
              <EditIcon />
            </Button>
          </div>
        </TransitionWrapper>
      )}
    </div>
  )
}

export default CollectionNameEdit
