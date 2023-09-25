"use client"
import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Input, Button } from "../ui"
import { z } from "zod"
import { imageSchema } from "./ImageUpload"
import { uploadImageAndGetURL } from "../util"

const imageGallerySchema = z.array(imageSchema)

export type ImageGalleryData = z.infer<typeof imageGallerySchema>

const ImageGalleryAdmin = ({ data, setData }: FieldTypeProps<ImageGalleryData>): ReactElement => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    const img = e.target as HTMLImageElement
    const updatedData = [...data]
    updatedData[index].width = img.naturalWidth
    updatedData[index].height = img.naturalHeight
    setData(updatedData)
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setIsUploading(true)

    try {
      const url = await uploadImageAndGetURL(file)
      setData([
        ...data,
        {
          url,
          width: 0, // Set a default width; update it once the image loads
          height: 0, // Set a default height; update it once the image loads
          alt: "",
        },
      ])
    } catch (error: any) {
      setUploadError(error.message || "An error occurred while uploading.")
    }
    setIsUploading(false)
  }

  const handleRemoveImage = (index: number) => {
    const updatedData = [...data]
    updatedData.splice(index, 1)
    setData(updatedData)
  }

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = [...data]
    updatedData[index].alt = e.target.value
    setData(updatedData)
  }

  return (
    <div className="flex flex-col space-y-4">
      {data &&
        typeof data.map === "function" &&
        data.map((imageData, index) => (
          <div key={index} className="image-preview space-y-2 relative">
            <Button aria-label="Remove Image" onClick={() => handleRemoveImage(index)} className="bg-red-500 hover:bg-red-600 rounded-full p-2 absolute -top-2 -right-3 h-8 w-8 text-2xl">
              ×
            </Button>
            <img className="rounded border mb-2 w-full h-auto" src={imageData.url} alt={imageData.alt || "Uploaded Image"} onLoad={(e) => handleImageLoad(e, index)} />
            <div className="image-caption flex flex-col space-y-2">
              <Label className="block opacity-70 font-medium">Image #{index + 1} Description</Label>
              <Input type="text" value={imageData.alt || ""} onChange={(e) => handleAltChange(e, index)} className="p-2 border rounded" />
            </div>
          </div>
        ))}
      <div>
        {data.length > 0 && (
          <Label className="block opacity-70 font-medium mb-1" htmlFor="uploader">
            Add another image
          </Label>
        )}
        {isUploading ? <div className="italic opacity-50">Uploading...</div> : <Input name="uploader" type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded" />}
      </div>
      {uploadError && <div className="text-red-500 bg-red-100 p-2 rounded">{uploadError}</div>}
    </div>
  )
}

const validateImageGallery = (data: ImageGalleryData) => {
  const validationResult = imageGallerySchema.safeParse(data)
  if (validationResult.success) {
    return { isValid: true }
  } else {
    return {
      isValid: false,
      errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
    }
  }
}

export const ImageGallery: FieldType<ImageGalleryData> = {
  renderAdmin: (props) => <ImageGalleryAdmin {...props} />,
  validate: validateImageGallery,
  schema: imageGallerySchema,
}
