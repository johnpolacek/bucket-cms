import React, { useState, ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { Label, Input, Button } from "../ui"
import { z } from "zod"
import { fileSchema } from "./FileUpload" // Update to your FileUpload component path
import { uploadFileAndGetURL } from "../util" // Ensure you have created this utility function

const fileLibrarySchema = z.array(fileSchema)

export type FileLibraryData = z.infer<typeof fileLibrarySchema>

const FileLibraryAdmin = ({ data, setData }: FieldTypeProps<FileLibraryData>): ReactElement => {
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
      setData([
        ...data,
        {
          url,
          name: file.name,
        },
      ])
    } catch (error: any) {
      setUploadError(error.message || "An error occurred while uploading.")
    }
    setIsUploading(false)
  }

  const handleRemoveFile = (index: number) => {
    const updatedData = [...data]
    updatedData.splice(index, 1)
    setData(updatedData)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedData = [...data]
    updatedData[index].name = e.target.value
    setData(updatedData)
  }

  return (
    <div className="flex flex-col space-y-4">
      {data &&
        typeof data.map === "function" &&
        data.map((fileData, index) => (
          <div key={index} className="file-preview space-y-2 relative">
            <Button aria-label="Remove File" onClick={() => handleRemoveFile(index)} className="bg-red-500 hover:bg-red-600 rounded-full p-2 absolute -top-2 -right-3 h-8 w-8 text-2xl">
              ×
            </Button>
            <div className="file-info flex flex-col space-y-2">
              <Label className="block opacity-70 font-medium">File #{index + 1} URL</Label>
              <Input type="text" value={fileData.url} readOnly className="p-2 border rounded bg-gray-100" />

              <Label className="block opacity-70 font-medium">File #{index + 1} Name</Label>
              <Input type="text" value={fileData.name || ""} onChange={(e) => handleNameChange(e, index)} className="p-2 border rounded" />
            </div>
          </div>
        ))}
      <div>
        {data.length > 0 && (
          <Label className="block opacity-70 font-medium mb-1" htmlFor="uploader">
            Add another file
          </Label>
        )}
        {isUploading ? <div className="italic opacity-50">Uploading...</div> : <Input name="uploader" type="file" onChange={handleFileChange} className="p-2 border rounded" />}
      </div>
      {uploadError && <div className="text-red-500 bg-red-100 p-2 rounded">{uploadError}</div>}
    </div>
  )
}

const validateFileLibrary = (data: FileLibraryData) => {
  const validationResult = fileLibrarySchema.safeParse(data)
  if (validationResult.success) {
    return { isValid: true }
  } else {
    return {
      isValid: false,
      errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
    }
  }
}

export const FileLibrary: FieldType<FileLibraryData> = {
  renderAdmin: (props) => <FileLibraryAdmin {...props} />,
  validate: validateFileLibrary,
  schema: fileLibrarySchema,
}
