import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Input } from "../ui"
import { z } from "zod"
import { imageSchema } from "./ImageUpload"

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
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/bucket/upload/image", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const responseData = await response.json()
        setData([
          ...data,
          {
            url: responseData.url,
            width: 0, // Set a default width; update it once the image loads
            height: 0, // Set a default height; update it once the image loads
            alt: "",
          },
        ])
      } else {
        const errorData = await response.json()
        setUploadError(errorData.error || "Failed to upload image.")
      }
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
      {data.map((imageData, index) => (
        <div key={index} className="image-preview space-y-2">
          <img className="rounded border mb-2" src={imageData.url} alt={imageData.alt || "Uploaded Image"} onLoad={(e) => handleImageLoad(e, index)} />
          <div className="image-caption flex flex-col space-y-2">
            <Label className="block opacity-70 font-medium">Image Description</Label>
            <Input type="text" value={imageData.alt || ""} onChange={(e) => handleAltChange(e, index)} className="p-2 border rounded" />
            <button onClick={() => handleRemoveImage(index)} className="text-red-500">
              Remove
            </button>
          </div>
        </div>
      ))}
      <Input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded" />
      {isUploading && <div className="text-blue-500">Uploading...</div>}
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
