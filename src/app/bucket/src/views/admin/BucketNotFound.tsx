"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Button } from "../../ui"
import { cn } from "../../ui/utils"

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
    <div className={cn("flex flex-col gap-4 py-16 items-center justify-center w-full h-full transition-all duration-1000", isCreating ? "opacity-0" : "opacity-100")}>
      <Image className="opacity-90 rounded-full overflow-hidden border border-blue-300 mx-auto mb-4" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
      <h3 className="text-3xl font-bold">Bucket needs a Bucket!</h3>
      <div className="text-center py-4">
        <div className="pb-2 opacity-60">Your bucket’s name shall be:</div>
        <div className="font-mono bg-blue-100 px-4 py-2 rounded-lg opacity-80">{bucketName}</div>
      </div>
      <div className="mt-3 text-center">
        <p className="py-6 text-xl font-medium text-blue-600">Would you like to create your bucket now?</p>
        <Button onClick={createBucket} className="h-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 px-8">
          Create Bucket
        </Button>
      </div>
    </div>
  )
}

export default BucketNotFound
