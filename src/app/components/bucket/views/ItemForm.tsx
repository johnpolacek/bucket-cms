"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui/Button"
import componentRegistry from "../components/registry"
import { Collection, ComponentData, CollectionItemData, ItemFormData } from "../types"

function ItemForm({ collectionName, onCancel, onComplete, itemToEdit }: { collectionName: string; onCancel: () => void; onComplete: () => void; itemToEdit?: CollectionItemData }) {
  const [collection, setCollection] = useState<Collection<ComponentData> | null>(null)
  const [itemName, setItemName] = useState("")
  const [formData, setFormData] = useState<ItemFormData | null>({ collectionName, rows: [] })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})
  const [componentErrors, setComponentErrors] = useState<string[][]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCollectionAndPopulate = async () => {
      if (collectionName) {
        try {
          const response = await fetch(`/api/bucket/collection/read?collectionName=${collectionName}`)
          const collectionData: Collection<ComponentData> = await response.json()

          let initialFormData = {
            collectionName,
            rows: collectionData.layout.map((row) => ({
              components: row.columns.map((component) => ({ name: component.name, data: {} })),
            })),
          }

          if (itemToEdit) {
            initialFormData = {
              collectionName,
              rows: collectionData.layout.map((row) => ({
                components: row.columns.map((component) => ({
                  name: component.name,
                  data: itemToEdit.data[component.name] || {},
                })),
              })),
            }
            setItemName(itemToEdit.itemName)
          }

          setCollection(collectionData)
          setFormData(initialFormData)
        } catch (error: any) {
          setErrors({ errorMessage: error.message || "Failed to load collection data" })
        }
      }
    }

    fetchCollectionAndPopulate()
  }, [collectionName, itemToEdit])

  const handleSubmit = async () => {
    if (!formData) {
      setErrors({ errorMessage: "Please provide some data" })
      return
    }

    if (!itemName.trim()) {
      setErrors({ errorMessage: "Item name is required." })
      return
    }

    let allComponentsValid = true
    const newComponentErrors: string[][] = []

    formData.rows.forEach((row, rowIndex) => {
      const rowErrors: string[] = []
      row.components.forEach((component, colIndex) => {
        const componentType = collection?.layout[rowIndex]?.columns[colIndex]?.component?.type
        if (!componentType) {
          allComponentsValid = false
          rowErrors[colIndex] = "Some components are missing."
          return
        }

        const componentFromRegistry = componentRegistry[componentType]
        const validationResult = componentFromRegistry.validate(component.data)
        if (!validationResult.isValid) {
          allComponentsValid = false
          rowErrors[colIndex] = validationResult.errorMessage || `Validation failed for ${component.name}`
        } else {
          rowErrors[colIndex] = "" // No error for this component
        }
      })
      newComponentErrors[rowIndex] = rowErrors
    })

    setComponentErrors(newComponentErrors)

    if (!allComponentsValid) {
      setErrors({ errorMessage: "Please fix the errors before submitting." })
      return
    }

    setIsSubmitting(true)

    // Create the data payload for the POST request
    const payload = {
      collectionName: formData.collectionName,
      itemName, // Add this line
      data: formData.rows.reduce((accumulatedData: any, row) => {
        row.components.forEach((component) => {
          accumulatedData[component.name] = component.data
        })
        return accumulatedData
      }, {}),
    }

    const apiEndpoint = itemToEdit ? "/api/bucket/item/update" : "/api/bucket/item/create"

    // POST the data to the API route
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to save the item")
      }

      const responseData = await response.json()
      if (responseData.success) {
        onComplete()
      } else {
        setErrors({ errorMessage: responseData.error || "An error occurred while saving the item." })
        setIsSubmitting(false)
      }
    } catch (error: any) {
      setErrors({ errorMessage: error.message || "An error occurred while saving the item." })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-[1200px]">
      <h3 className="uppercase opacity-50 text-sm pb-1">{collectionName}</h3>
      <h2 className="text-3xl pb-8">{itemToEdit ? "Edit Item" : "Create New Item"}</h2>

      {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

      {collection && formData?.rows && (
        <div className="grid grid-cols-2 divide-x gap-8">
          <div className="flex flex-col gap-8">
            <div className="mb-6">
              <label className="block opacity-70 font-medium">Item Name</label>
              <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter item name..." />
            </div>

            {formData?.rows.map((row, rowIndex) =>
              row.components.map((component, colIndex) => {
                const componentType = collection?.layout[rowIndex]?.columns[colIndex]?.component?.type
                if (!componentType) return null // Handle the case where componentType is undefined

                const componentFromRegistry = componentRegistry[componentType]
                return (
                  <div key={`row-${rowIndex}-col-${colIndex}`} className="flex flex-col gap-2">
                    <label className="block opacity-70 font-medium">{component.name}</label>
                    {componentFromRegistry &&
                      componentFromRegistry.renderAdmin({ ...component.data }, (updatedData: ComponentData) => {
                        // Update the formData based on changes in the component's admin UI
                        setFormData((prev) => {
                          if (!prev) return null
                          const newData = { ...prev }
                          newData.rows[rowIndex].components[colIndex].data = updatedData
                          return newData
                        })
                      })}
                    {componentErrors[rowIndex] && componentErrors[rowIndex][colIndex] && <div className="text-red-500 text-sm">{componentErrors[rowIndex][colIndex]}</div>}
                  </div>
                )
              })
            )}
          </div>
          <div className="pl-8">
            <h3 className="-mt-8 font-medium italic pb-2 opacity-50 text-center">Preview</h3>
            <div className="flex flex-col gap-4 border">
              {formData?.rows.map((row, rowIndex) => (
                <div key={`preview-row-${rowIndex}`} className="flex p-4 gap-4">
                  {row.components.map((component, colIndex) => {
                    const componentType = collection.layout[rowIndex].columns[colIndex].component.type
                    const componentFromRegistry = componentRegistry[componentType]
                    return <div key={`preview-row-${rowIndex}-col-${colIndex}`}>{componentFromRegistry && componentFromRegistry.render(component.data)}</div>
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="w-[140px] text-center" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Collection"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemForm
