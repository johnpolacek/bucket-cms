"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui/Button"
import { Collection, ComponentData } from "../types"
import componentRegistry from "../components/registry"

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
  const [collection, setCollection] = useState<Collection<ComponentData> | null>(null)
  const [formData, setFormData] = useState<FormData | null>({ name: collectionName, rows: [] })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})

  useEffect(() => {
    if (collectionName) {
      fetch(`/api/bucket/collection/read?collectionName=${collectionName}`)
        .then((response) => response.json())
        .then((data: Collection<ComponentData>) => {
          setCollection(data)
          setFormData({
            name: collectionName,
            rows: data.layout.map((row) => ({
              components: row.columns.map((component) => ({ name: component.name, value: "" })),
            })),
          })
        })
        .catch((error) => {
          setErrors({ errorMessage: "Failed to load collection data" })
        })
    }
  }, [collectionName])

  const handleSubmit = () => {
    console.log(formData)
    onComplete()
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-[1200px]">
      <h3 className="uppercase text-gray-500 text-sm pb-1">{collectionName}</h3>
      <h2 className="text-3xl pb-8">Create New Item</h2>

      {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

      <div className="flex flex-col gap-8">
        {formData?.rows.map((row, rowIndex) =>
          row.components.map((component, colIndex) => {
            const componentType = collection?.layout[rowIndex]?.columns[colIndex]?.component?.type
            if (!componentType) return null // Handle the case where componentType is undefined

            const componentFromRegistry = componentRegistry[componentType]
            console.log({ componentFromRegistry })
            return (
              <div key={`row-${rowIndex}-col-${colIndex}`} className="flex flex-col gap-2">
                <label className="block text-gray-700 font-medium">{component.name}</label>
                {componentFromRegistry &&
                  componentFromRegistry.renderAdmin({ value: component.value }, (updatedData) => {
                    // Update the formData based on changes in the component's admin UI
                    console.log({ updatedData })
                    setFormData((prev) => {
                      if (!prev) return null
                      const newData = { ...prev }
                      console.log({ newData })
                      newData.rows[rowIndex].components[colIndex].value = updatedData.value
                      return newData
                    })
                  })}
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
