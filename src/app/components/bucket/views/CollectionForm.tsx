"use client"
import React, { useState } from "react"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Collection, CollectionRowDraft, ComponentData } from "../types"
import componentRegistry from "../components/registry"

type ErrorState = {
  name?: string
  components?: string[]
  errorMessage?: string
}

function CollectionForm({ collection = null, onCancel, onComplete }: { collection?: Collection<ComponentData> | null; onCancel: () => void; onComplete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [layout, setLayout] = useState<CollectionRowDraft<ComponentData>[]>(collection ? collection.layout : [{ columns: [undefined] }])
  const [errors, setErrors] = useState<ErrorState>({})
  const isEditMode = Boolean(collection)

  const availableComponents = Object.keys(componentRegistry)

  const addRow = () => {
    setLayout((prevLayout) => [...prevLayout, { columns: [undefined] }])
  }

  const handleColumnChange = (rowIndex: number, columns: number) => {
    const updatedLayout = [...layout]
    const currentRow = updatedLayout[rowIndex]

    if (currentRow.columns.length > columns) {
      currentRow.columns.length = columns // Truncate array if reducing columns
    } else {
      while (currentRow.columns.length < columns) {
        currentRow.columns.push(undefined) // Add default component items if increasing columns
      }
    }

    setLayout(updatedLayout)
  }

  const handleComponentChange = (rowIndex: number, colIndex: number, componentType: string) => {
    const updatedLayout = [...layout]
    const newComponent = componentRegistry[componentType]

    // Ensure the row exists
    if (!updatedLayout[rowIndex]) {
      updatedLayout[rowIndex] = { columns: [] }
    }

    if (!updatedLayout[rowIndex].columns[colIndex]) {
      updatedLayout[rowIndex].columns[colIndex] = {
        name: "",
        component: newComponent,
      }
    } else {
      updatedLayout[rowIndex].columns[colIndex]!.component = newComponent
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
        const unsetComponentTypes = row.columns.filter((column) => !column?.name).length
        const unsetComponentNames = row.columns.filter((column) => !column?.component).length

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
      const endpoint = isEditMode ? "/api/bucket/collection/update" : "/api/bucket/collection/create"
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: collectionName,
            layout: layout,
          }),
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
                <Select value={row.columns.length.toString()} onValueChange={(value) => handleColumnChange(rowIndex, parseInt(value))}>
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
              {row.columns.map((column, colIndex) => {
                if (!column) {
                  column = {
                    name: "",
                  }
                }

                return (
                  <div key={colIndex} className="flex flex-col items-center grow gap-2 px-2 py-4 bg-gray-50 border-2 border-dashed rounded justify-center">
                    <Input
                      className={`w-[240px] text-sm py-1 px-2 ${errors.components && !column.name ? "border-red-500" : ""}`}
                      type="text"
                      value={column.name || ""}
                      onChange={(e) => {
                        const updatedLayout = [...layout]

                        // Ensure the row exists
                        if (!updatedLayout[rowIndex]) {
                          updatedLayout[rowIndex] = { columns: [] }
                        }

                        // Ensure the column exists in the row
                        if (!updatedLayout[rowIndex].columns[colIndex]) {
                          updatedLayout[rowIndex].columns[colIndex] = {
                            name: e.target.value,
                            component: undefined,
                          }
                        } else {
                          updatedLayout[rowIndex].columns[colIndex]!.name = e.target.value
                        }

                        setLayout(updatedLayout)
                      }}
                      placeholder="Component Name"
                    />
                    <Select
                      onValueChange={(value) => {
                        handleComponentChange(rowIndex, colIndex, value) // Update the layout with the selected component
                      }}
                      value={column?.component?.type}
                    >
                      <SelectTrigger className={`w-[240px] bg-white ${errors.components ? "border-red-500" : ""}`}>
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
                )
              })}
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
