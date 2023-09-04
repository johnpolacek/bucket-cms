import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Input } from "../ui"
import { z } from "zod"

export const imageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  width: z.number().min(0, "Missing image width"),
  height: z.number().min(0, "Missing image height"),
  alt: z.string(),
})

export type ImageData = z.infer<typeof imageSchema>

const ImageAdmin = ({ data, setData }: FieldTypeProps<ImageData>): ReactElement => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [imageNaturalSize, setImageNaturalSize] = useState<{ width: number; height: number } | null>(null)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement
    setImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight })
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)
    setUploadError(null)

    const file = event.target.files?.[0]
    if (!file) {
      setUploadError("No file selected.")
      setIsUploading(false)
      return
    }

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/bucket/upload/image", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const responseData = await response.json()
        setData &&
          setData({
            url: responseData.url,
            width: 0, // Set a default width; update it once the image loads
            height: 0, // Set a default height; update it once the image loads
            alt: "",
          })
      } else {
        const errorData = await response.json()
        setUploadError(errorData.error || "Failed to upload image.")
      }
    } catch (error: any) {
      setUploadError(error.message || "An error occurred while uploading.")
    }

    setIsUploading(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      {data?.url && (
        <div className="image-preview space-y-2">
          <img
            className="max-w-[320px] h-auto rounded border mb-4"
            src={data.url}
            alt={data.alt || "Uploaded Image"}
            onLoad={handleImageLoad}
            width={imageNaturalSize?.width || data.width}
            height={imageNaturalSize?.height || data.height}
          />
          <div className="image-caption flex flex-col space-y-2">
            <Label className="block opacity-70 font-medium">Alt Text</Label>
            <Input type="text" value={data?.alt || ""} onChange={(e) => setData && setData({ ...data, alt: e.target.value })} className="p-2 border rounded" />
            {imageNaturalSize && (
              <p className="text-sm text-gray-600">
                <strong>Dimensions:</strong> {imageNaturalSize.width}x{imageNaturalSize.height}
              </p>
            )}
          </div>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded" />
      {isUploading && <div className="text-blue-500">Uploading...</div>}
      {uploadError && <div className="text-red-500 bg-red-100 p-2 rounded">{uploadError}</div>}
    </div>
  )
}

export const ImageUpload: FieldType<ImageData> = {
  renderAdmin: (props) => <ImageAdmin {...props} />,
  validate: (data: ImageData) => {
    const validationResult = imageSchema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema: imageSchema,
}
