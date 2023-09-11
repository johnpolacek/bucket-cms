import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Input } from "../ui"
import { z } from "zod"
import { uploadFileAndGetURL } from "../util" // Ensure you have created this utility function

const schema = z.object({
  url: z.string().url("Invalid file URL"),
  name: z.string(),
})

export const fileSchema = schema

export type FileData = z.infer<typeof schema>

const FileAdmin = ({ data, setData }: FieldTypeProps<FileData>): ReactElement => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)

    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setIsUploading(true)
    try {
      const url = await uploadFileAndGetURL(file)
      setData && setData({ url, name: file.name })
    } catch (error: any) {
      setUploadError(error.message || "An error occurred while uploading.")
    }

    setIsUploading(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      {data?.url && (
        <div className="file-info space-y-2">
          <Label className="block opacity-70 font-medium">File URL</Label>
          <Input type="text" value={data.url} readOnly className="p-2 border rounded bg-gray-100" />

          <Label className="block opacity-70 font-medium">File Name</Label>
          <Input type="text" value={data?.name || ""} onChange={(e) => setData && setData({ ...data, name: e.target.value })} className="p-2 border rounded" />
        </div>
      )}
      <Input type="file" onChange={handleFileChange} className="p-2 border rounded" />
      {isUploading && <div className="text-blue-500">Uploading...</div>}
      {uploadError && <div className="text-red-500 bg-red-100 p-2 rounded">{uploadError}</div>}
    </div>
  )
}

export const FileUpload: FieldType<FileData> = {
  renderAdmin: (props) => <FileAdmin {...props} />,
  validate: (data: FileData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema,
}
