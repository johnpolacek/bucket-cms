"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui/Button"
import { Collection } from "../types"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css" // import styles

type FormDataComponent = {
  name: string
  value: string
}

type FormDataRow = {
  components: FormDataComponent[]
}

type FormData = {
  name: string
  rows: FormDataRow[]
}

function ItemForm({ collectionName, onCancel, onComplete }: { collectionName: string; onCancel: () => void; onComplete: () => void }) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [formData, setFormData] = useState<FormData | null>({ name: collectionName, rows: [] })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})

  useEffect(() => {
    if (collectionName) {
      fetch(`/api/bucket/collection/read?collectionName=${collectionName}`)
        .then((response) => response.json())
        .then((data: Collection) => {
          setCollection(data)
          setFormData({
            name: collectionName,
            rows: data.layout.map((row) => ({
              components: row.components.map((component) => ({ name: component.name, value: "" })),
            })),
          })
        })
        .catch((error) => {
          setErrors({ errorMessage: "Failed to load collection data" })
        })
    }
  }, [collectionName])

  const handleRichTextChange = (rowIndex: number, colIndex: number, content: string) => {
    setFormData((prev) => {
      if (!prev) return null

      const itemData: FormData = JSON.parse(JSON.stringify(prev)) // Deep copy to avoid direct mutation
      itemData.rows[rowIndex].components[colIndex].value = content
      return itemData
    })
  }

  const handleImageChange = async (rowIndex: number, colIndex: number, file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      // const response = await fetch("/api/bucket/upload/image", {
      //   method: "POST",
      //   body: formData,
      // })

      // if (response.ok) {
      //   const { url } = await response.json()

      //   setFormData((prev) => {
      //     if (!prev) return null

      //     const itemData: FormData = JSON.parse(JSON.stringify(prev)) // Deep copy to avoid direct mutation
      //     itemData.rows[rowIndex].components[colIndex].value = url
      //     return itemData
      //   })
      // } else {
      //   const { error } = await response.json()
      //   console.error("Image upload failed:", error)
      // }
    } catch (error) {
      console.error("There was an error uploading the image:", error)
    }
  }

  const handleSubmit = () => {
    console.log(formData)
    onComplete()
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-[1200px]">
      <h3 className="uppercase text-gray-500 text-sm">{collectionName}</h3>
      <h2 className="text-3xl font-bold pb-8">Create New Item</h2>

      {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

      <div className="flex flex-col gap-8">
        {formData?.rows.map((row, rowIndex) =>
          row.components.map((component, colIndex) => {
            return (
              <div key={`row-${rowIndex}-col-${colIndex}`} className="flex flex-col gap-2">
                <label className="block text-gray-700 font-medium mb-2">{component.name}</label>
                {collection?.layout[rowIndex].components[colIndex].type === "Image" ? (
                  <input type="file" accept="image/*" onChange={(e) => e.target.files && handleImageChange(rowIndex, colIndex, e.target.files[0])} />
                ) : (
                  <ReactQuill value={component.value} onChange={(content) => handleRichTextChange(rowIndex, colIndex, content)} />
                )}
              </div>
            )
          })
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Collection</Button>
      </div>
    </div>
  )
}

export default ItemForm
