"use client"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"
import "react-quill/dist/quill.snow.css"
import DOMPurify from "dompurify"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"

// Dynamically import Quill, but only on the client side
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // This will prevent Quill from being imported during SSR
  loading: () => <p>Loading editor...</p>,
})

const richTextSchema = z.object({
  value: z.string().min(1, "Content cannot be empty"),
})

export type RichTextData = z.infer<typeof richTextSchema>

export const RichText: FieldType<RichTextData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<RichTextData>): ReactElement => {
    return typeof window !== "undefined" ? (
      <ReactQuill
        theme="snow"
        defaultValue={data?.value || ""}
        onChange={(value) => {
          // Sanitize the value with DOMPurify before setting it
          const sanitizedValue = DOMPurify.sanitize(value)
          setData && setData({ value: sanitizedValue })
        }}
      />
    ) : (
      <></>
    )
  },
  validate: (data: RichTextData) => {
    const validationResult = richTextSchema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema: richTextSchema,
}
