"use client"
import React, { useState } from "react"
import { Input, Button } from "../../ui"
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
            className="text-2xl sm:text-4xl text-primary h-auto font-semibold text-center bg-transparent border-t-0 border-l-0 border-r-0 border-b-blue-200 rounded-none focus-visible:ring-0"
            name="collectionName"
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
            autoFocus={true}
          />
          <div className="flex pl-1 gap-1 absolute h-full items-center top-0 left-[100%]">
            <Button
              onClick={() => {
                setCollectionName(initialValue)
                setIsEditing(false)
              }}
              variant="outline"
              className="px-1 py-0 border-gray-400 scale-90"
              aria-label="Cancel Changes"
            >
              <div className="text-2xl font-light w-6">
                <span className="relative -top-px">×</span>
              </div>
            </Button>
            <Button
              onClick={() => {
                onChange(collectionName)
                setIsEditing(false)
              }}
              variant="outline"
              className="px-1 py-0 border-gray-400 scale-90"
              aria-label="Save Changes"
            >
              <CheckIcon className="h-6 w-6" />
            </Button>
          </div>
        </TransitionWrapper>
      ) : (
        <TransitionWrapper>
          <div className="relative">
            <h3 className="text-2xl sm:text-4xl font-semibold py-1 text-primary">{collectionName}</h3>
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
