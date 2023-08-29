"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui"
import { Collection, CollectionFetch, ComponentData, CollectionItemData, Field, ItemFormData } from "../../types"
import * as FieldTypes from "../../field-types"

function ItemForm({ collectionName, onCancel, onComplete, itemToEdit }: { collectionName: string; onCancel: () => void; onComplete: () => void; itemToEdit?: CollectionItemData }) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [itemName, setItemName] = useState("")
  const [formData, setFormData] = useState<ItemFormData | null>({ collectionName, fields: [] })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})
  const [fieldErrors, setFieldErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCollectionAndPopulate = async () => {
      if (collectionName) {
        try {
          const response = await fetch(`/api/bucket/collection/read?collectionName=${collectionName}`)
          const collectionData: CollectionFetch = await response.json()

          // collection data had a typeName reference to a key of FieldTypes
          // we can use that to assign the FieldType to each field
          const typedFields: Field[] = collectionData.fields.map((field) => {
            const fieldTypeKey = field.typeName as keyof typeof FieldTypes
            const fieldType = FieldTypes[fieldTypeKey]
            return {
              ...field,
              type: fieldType,
            }
          })
          const typedCollection: Collection = {
            ...collectionData,
            fields: typedFields,
          }

          let initialFormData = {
            collectionName,
            fields: collectionData.fields.map((field) => ({
              name: field.name,
              data: {},
            })),
          }

          if (itemToEdit) {
            initialFormData = {
              collectionName,
              fields: collectionData.fields.map((field) => ({
                name: field.name,
                data: itemToEdit.data[field.name] || {},
              })),
            }
            setItemName(itemToEdit.itemName)
          }

          setCollection(typedCollection)
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
    const newErrors: string[] = []

    formData.fields.forEach((field, index) => {
      const fieldType = collection?.fields[index]?.type
      console.log("fieldType", fieldType)

      if (!fieldType) {
        allComponentsValid = false
        newErrors[index] = "Some fields are missing."
        return
      }

      try {
        console.log(`Field: ${field.name}`, { fieldType }, JSON.stringify(fieldType.schema))
        fieldType.schema.parse(field.data)
      } catch (error: any) {
        allComponentsValid = false
        newErrors[index] = error.message || `Validation failed for ${field.name}`
      }
    })

    setFieldErrors(newErrors)

    if (!allComponentsValid) {
      setErrors({ errorMessage: "Please fix the errors before submitting." })
      return
    }

    setIsSubmitting(true)

    type ItemPayload = {
      collectionName: string
      itemName: string
      data: any
      itemId?: string
    }

    const payload: ItemPayload = {
      collectionName: formData.collectionName,
      itemName,
      data: formData.fields.reduce((accumulatedData: any, field) => {
        accumulatedData[field.name] = field.data
        return accumulatedData
      }, {}),
    }

    // If we are updating, add the itemId to the payload
    if (itemToEdit) {
      payload.itemId = itemToEdit.itemId
    }

    let apiEndpoint
    let requestMethod

    if (itemToEdit) {
      apiEndpoint = "/api/bucket/item/update"
      requestMethod = "PUT"
    } else {
      apiEndpoint = "/api/bucket/item/create"
      requestMethod = "POST"
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.log({ response })
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

  console.log({ collection, formData })

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-[1200px]">
      <h3 className="uppercase opacity-50 text-sm pb-1">{collectionName}</h3>
      <h2 className="text-3xl pb-8">{itemToEdit ? "Edit Item" : "Create New Item"}</h2>

      {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

      {collection && formData?.fields && (
        <div className="grid grid-cols-2 divide-x gap-8">
          <div className="flex flex-col gap-8">
            <div className="mb-6">
              <label className="block opacity-70 font-medium">Item Name</label>
              <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter item name..." />
            </div>

            {formData?.fields.map((field, index) => {
              const fieldTypeKey = collection.fields[index].typeName as keyof typeof FieldTypes
              const fieldType = FieldTypes[fieldTypeKey]

              if (!fieldType) {
                return (
                  <div key={`field-${index}`} className="text-red-500">
                    Field type not found!
                  </div>
                )
              }

              return (
                <div key={`field-${index}`} className="flex flex-col gap-2">
                  <label className="block opacity-70 font-medium">{field.name}</label>
                  {fieldType.renderAdmin({
                    data: field.data as any, // type checking and validation occurs during submit
                    setData: (updatedData: ComponentData) => {
                      setFormData((prev) => {
                        if (!prev) return null
                        const newData = { ...prev }
                        newData.fields[index].data = updatedData
                        return newData
                      })
                    },
                  })}
                  {fieldErrors[index] && <div className="text-red-500 text-sm">{fieldErrors[index]}</div>}
                </div>
              )
            })}
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="w-[140px] text-center" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Item"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemForm
