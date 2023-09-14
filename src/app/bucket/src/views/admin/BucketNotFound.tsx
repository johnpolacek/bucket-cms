import React from "react"
import Image from "next/image"
import { Button } from "../../ui"

interface BucketNotFoundProps {
  bucketName: string
  onBucketCreated: () => void
}

const BucketNotFound: React.FC<BucketNotFoundProps> = ({ bucketName, onBucketCreated }) => {
  const createBucket = async () => {
    try {
      const response = await fetch("/api/bucket/bucket/create", { method: "POST" })
      const responseData = await response.json()

      if (response.ok) {
        onBucketCreated()
      } else {
        console.error("Failed to create bucket:", responseData.error)
      }
    } catch (error) {
      console.error("Error creating bucket:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4 py-16 items-center justify-center w-full h-full">
      <Image className="opacity-90 rounded-full overflow-hidden border-2 shadow-lg border-blue-200 mx-auto mb-4" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
      <h3 className="text-3xl font-bold">Bucket Not Found</h3>
      <div className="text-center py-4">
        <div className="pb-2 opacity-60">Looking for:</div>
        <div className="font-mono bg-blue-100 px-4 py-2 rounded-lg opacity-80">{bucketName}</div>
      </div>
      <div className="mt-3 text-center">
        <p className="py-6 text-xl font-medium text-blue-600">Would you like to create the bucket now?</p>
        <Button onClick={createBucket} className="h-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 px-8 rounded">
          Create Bucket
        </Button>
      </div>
    </div>
  )
}

export default BucketNotFound
