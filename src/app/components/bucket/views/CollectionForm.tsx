"use client"
import React, { useState } from "react"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Collection, CollectionRow } from "../types"

type ErrorState = {
  name?: string
  components?: string[]
  errorMessage?: string
}

const availableComponents = ["RichText", "Image", "Video"]

function CollectionForm({ collection = null, onCancel, onComplete }: { collection?: Collection | null; onCancel: () => void; onComplete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [layout, setLayout] = useState<CollectionRow[]>(collection ? collection.layout : [{ components: [{ name: "", type: "" }] }])
  const [errors, setErrors] = useState<ErrorState>({})

  const isEditMode = Boolean(collection)

  const addRow = () => {
    setLayout((prevLayout) => [...prevLayout, { components: [{ name: "", type: "" }] }])
  }

  const handleColumnChange = (rowIndex: number, columns: number) => {
    const updatedLayout = [...layout]
    const currentRow = updatedLayout[rowIndex]

    if (currentRow.components.length > columns) {
      currentRow.components.length = columns // Truncate array if reducing columns
    } else {
      while (currentRow.components.length < columns) {
        currentRow.components.push({ name: "", type: "" }) // Add default component items if increasing columns
      }
    }

    setLayout(updatedLayout)
  }

  const handleComponentChange = (rowIndex: number, colIndex: number, componentType: string) => {
    const updatedLayout = [...layout]
    if (!updatedLayout[rowIndex].components[colIndex]) {
      updatedLayout[rowIndex].components[colIndex] = { name: componentType, type: componentType }
    } else {
      updatedLayout[rowIndex].components[colIndex].type = componentType
    }
    setLayout(updatedLayout)
  }

  const validateForm = () => {
    const newErrors: ErrorState = {}

    if (!collectionName) {
      newErrors.name = "Collection name is required!"
    }

    // Validate if all selects have a component chosen
    const componentErrors = layout
      .map((row, index) => {
        const unsetComponentTypes = row.components.filter((component) => !component.type).length
        const unsetComponentNames = row.components.filter((component) => !component.name).length

        if (unsetComponentTypes > 0 && unsetComponentNames > 0) {
          return `Row #${index + 1}: Please select component types and set names`
        } else if (unsetComponentTypes > 0) {
          return `Row #${index + 1}: Please select component types`
        } else if (unsetComponentNames > 0) {
          return `Row #${index + 1}: Please set names`
        }

        return null
      })
      .filter(Boolean) as string[]

    if (componentErrors.length) {
      newErrors.components = componentErrors
    }

    setErrors(newErrors)
    return !newErrors.name && componentErrors.length === 0
  }

  const handleDeleteRow = (rowIndex: number) => {
    const updatedLayout = [...layout]
    updatedLayout.splice(rowIndex, 1)
    setLayout(updatedLayout)
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      const collectionData: Collection = {
        name: collectionName,
        layout: layout,
      }
      const endpoint = isEditMode ? "/api/bucket/collection/update" : "/api/bucket/collection/create"
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(collectionData),
        })

        if (response.ok) {
          const result = await response.json()
          onComplete()
        } else {
          const errorData = await response.json()
          setErrors({
            errorMessage: errorData.error,
          })
        }
      } catch (error) {
        setErrors({
          errorMessage: (error as Error).message || "Sorry, there was an error.",
        })
      }
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-[1200px] flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create a New Collection</h1>

      <Input className="w-[320px] h-auto text-lg py-3 px-4" type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="Enter collection name" />
      {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

      <div className="flex flex-col gap-4">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 mb-2">Row #{rowIndex + 1}</div>
              {layout.length > 1 && (
                <Button className="ml-4 text-xs mt-1 mb-3 px-2 py-1 h-auto" variant="outline" onClick={() => handleDeleteRow(rowIndex)}>
                  × Delete
                </Button>
              )}
              <div className="flex items-center gap-2 mb-3 grow justify-end">
                <div className="text-sm">Layout: </div>
                <Select value={row.components.length.toString()} onValueChange={(value) => handleColumnChange(rowIndex, parseInt(value))}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"1"}>1 Column</SelectItem>
                    <SelectItem value={"2"}>2 Columns</SelectItem>
                    <SelectItem value={"3"}>3 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex w-full gap-2">
              {row.components.map((component, colIndex) => (
                <div key={colIndex} className="flex flex-col items-center grow gap-2 px-2 py-4 bg-gray-50 border-2 border-dashed rounded justify-center">
                  <Input
                    className={`w-[240px] text-sm py-1 px-2 ${errors.components && !component.name ? "border-red-500" : ""}`}
                    type="text"
                    value={component.name || ""}
                    onChange={(e) => {
                      const updatedLayout = [...layout]
                      updatedLayout[rowIndex].components[colIndex].name = e.target.value
                      setLayout(updatedLayout)
                    }}
                    placeholder="Component Name"
                  />

                  <Select
                    onValueChange={(value) => {
                      handleComponentChange(rowIndex, colIndex, value) // Update the layout with the selected component
                    }}
                    value={component.type || undefined}
                  >
                    <SelectTrigger className={`w-[240px] bg-white ${errors.components && !component.type ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select Component" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableComponents.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={addRow}>+ Add Row</Button>
      </div>

      {errors.components && (
        <div className="flex flex-col gap-1">
          {errors.components.map((error, index) => (
            <div key={index} className="text-red-500 text-sm">
              {error}
            </div>
          ))}
        </div>
      )}

      {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Collection</Button>
      </div>
    </div>
  )
}

export default CollectionForm
