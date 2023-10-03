"use client"
import React, { useState } from "react"
import { BrandImage } from "../brand/BrandImage"
import { Button } from "../../ui"
import { cn } from "../../ui/utils"
import TransitionWrapper from "./TransitionWrapper"

interface BucketNotFoundProps {
  bucketName: string
  onBucketCreated: () => void
}

const BucketNotFound: React.FC<BucketNotFoundProps> = ({ bucketName, onBucketCreated }) => {
  const [isCreating, setIsCreating] = useState(false)

  const createBucket = async () => {
    try {
      setIsCreating(true)
      const response = await fetch("/api/bucket/bucket/create", { method: "POST" })
      const responseData = await response.json()

      if (response.ok) {
        onBucketCreated()
      } else {
        console.error("Failed to create bucket:", responseData.error)
        setIsCreating(false)
      }
    } catch (error) {
      console.error("Error creating bucket:", error)
      setIsCreating(false)
    }
  }

  return (
    <TransitionWrapper>
      <div className={cn("flex flex-col gap-4 py-12 items-center justify-center w-full h-full transition-all duration-1000", isCreating ? "opacity-0" : "opacity-100")}>
        <BrandImage />
        <h3 className="text-3xl font-bold">Bucket needs a Bucket!</h3>
        <div className="text-center py-4">
          <div className="pb-2 opacity-60 text-sm sm:text-base">Your bucket’s name shall be:</div>
          <div className="font-mono bg-blue-100 px-4 py-2 rounded-lg opacity-80">{bucketName}</div>
        </div>
        <div className="text-center">
          <p className="py-4 text-xl font-medium text-blue-600">Would you like to create your bucket now?</p>
          <Button onClick={createBucket} className="h-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 px-8">
            Create Bucket
          </Button>
        </div>
      </div>
    </TransitionWrapper>
  )
}

export default BucketNotFound
