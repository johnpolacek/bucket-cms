"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { BaseComponent } from "../../types"
import DOMPurify from "dompurify"
import { z } from "zod"

// Define a schema for RichTextComponentData
const RichTextComponentDataSchema = z.object({
  content: z.string(),
})
type RichTextComponentData = z.infer<typeof RichTextComponentDataSchema>

const RichText: BaseComponent<RichTextComponentData> = {
  type: "RichText",
  render: (data: RichTextComponentData) => {
    const sanitizedHTML = DOMPurify.sanitize(data.content)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  },
  renderAdmin: (data: RichTextComponentData, setData) => {
    console.log("RichText data", data)
    console.log("RichText defaultValue", data.content || "")
    return <ReactQuill theme="snow" defaultValue={data.content || ""} onChange={(value) => setData({ content: value })} />
  },
  validate: (data) => {
    console.log("validate data", data)
    const result = RichTextComponentDataSchema.safeParse(data)
    if (result.success) {
      return { isValid: true }
    } else {
      return {
        isValid: false,
        errorMessage: result.error.errors[0]?.message || "Validation failed.", // Use the first error message from zod, or a default one
      }
    }
  },
  defaultData: {
    content: "",
  },
}

export default RichText
