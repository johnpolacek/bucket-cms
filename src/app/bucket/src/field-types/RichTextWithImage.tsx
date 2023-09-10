"use client"
import dynamic from "next/dynamic"
import React, { ReactElement, useRef, useState } from "react"
import "react-quill/dist/quill.snow.css"
import DOMPurify from "dompurify"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { uploadImageAndGetURL } from "../util"

// Dynamically import Quill, but only on the client side
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // This will prevent Quill from being imported during SSR
  loading: () => <p>Loading editor...</p>,
})

const schema = z.object({
  value: z.string().min(1, "Content cannot be empty"),
})

export type RichTextData = z.infer<typeof schema>

const RichTextAdmin = ({ data, setData }: FieldTypeProps<RichTextData>): ReactElement => {
  const quillRef = useRef<any>(null)

  const handleImageUpload = async () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*"
    fileInput.onchange = async () => {
      if (fileInput.files) {
        const file = fileInput.files[0]
        if (file && quillRef.current) {
          try {
            const url = await uploadImageAndGetURL(file)
            const quill = quillRef.current // Now we use quillRef directly
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, "image", url)
          } catch (error) {
            console.error("Failed to upload image:", error)
          }
        }
      }
    }
    fileInput.click()
  }

  return typeof window !== "undefined" ? (
    <ReactQuill
      theme="snow"
      defaultValue={data?.value || ""}
      onChange={(value) => {
        // ... your existing code
      }}
      modules={{
        toolbar: {
          container: [
            // ... your existing toolbar options
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
          handlers: {
            image: handleImageUpload,
          },
        },
      }}
    />
  ) : (
    <></>
  )
}

export const RichText: FieldType<RichTextData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<RichTextData>): ReactElement => {
    return typeof window !== "undefined" ? <RichTextAdmin data={data} setData={setData} /> : <></>
  },
  validate: (data: RichTextData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema,
}
