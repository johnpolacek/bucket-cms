import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Button } from "../ui"
import { z } from "zod"
import { imageSchema } from "."

const imageGallerySchema = z.array(imageSchema)

export type ImageGalleryData = z.infer<typeof imageGallerySchema>

const ImageGalleryAdmin = ({ data, setData }: FieldTypeProps<ImageData[]>): ReactElement => {
  // ... (implementation details here)
  // This will allow the user to upload multiple images,
  // display thumbnails of the uploaded images,
  // and provide options to remove individual images.
  return <div>ImageGalleryAdmin</div>
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
