"use client"
import React, { ReactElement } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import DOMPurify from "dompurify"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"

const richTextSchema = z.object({
  value: z.string().min(1, "Content cannot be empty"),
})

type RichTextData = z.infer<typeof richTextSchema>

export const RichText: FieldType<RichTextData> = {
  renderAdmin: ({ data, setData, Component }: FieldTypeProps<RichTextData>): ReactElement => {
    if (Component) {
      return <Component data={data} setData={setData} />
    }
    return <ReactQuill theme="snow" defaultValue={data?.value || ""} onChange={(value) => setData && setData({ value })} />
  },
  render: ({ data, Component }: FieldTypeProps<RichTextData>): ReactElement => {
    if (Component) {
      return <Component data={data} />
    }
    const sanitizedHTML = DOMPurify.sanitize(data.value)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
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
