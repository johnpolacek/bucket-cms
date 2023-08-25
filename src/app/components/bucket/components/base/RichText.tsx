"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { BaseComponent } from "../../types"
import DOMPurify from "dompurify"

interface RichTextComponentData {
  content: string
}

const RichText: BaseComponent<RichTextComponentData> = {
  type: "RichText",
  render: (data) => {
    const sanitizedHTML = DOMPurify.sanitize(data.content)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  },
  renderAdmin: (data, setData) => {
    return <ReactQuill theme="snow" value={data.content || ""} onChange={(value) => setData({ content: value })} />
  },
  validate: (data) => {
    return typeof data.content === "string"
  },
  defaultData: {
    content: "",
  },
}

export default RichText
