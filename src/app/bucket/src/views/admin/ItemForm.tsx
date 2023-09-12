"use client"
import React, { useState, useEffect } from "react"
import { Button, Label, Input } from "../../ui"
import { Collection, CollectionFetch, CollectionItemData, CollectionReferenceField, Field, ItemFormData, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"
import { AllFieldTypes } from "../../field-types"
import { TextData } from "../../field-types/Text"
import { Transition } from "@headlessui/react"
import { isZodObjectOrArray, getDefaultDataFromSchema } from "../../util"

function ItemForm({ collectionName, onCancel, onComplete, itemToEdit }: { collectionName: string; onCancel: () => void; onComplete: () => void; itemToEdit?: CollectionItemData }) {
  const [collection, setCollection] = useState<Collection | null>(null)
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

          setCollection(typedCollection)

          const initialFormData = {
            collectionName,
            fields: collectionData.fields.map((field) => {
              console.log("initialFormData field", { field })
              const fieldType = FieldTypes[field.typeName as keyof typeof FieldTypes]
              console.log({ fieldType })
              const defaultData = getDefaultDataFromSchema(fieldType.schema)
              return {
                name: field.name,
                data: itemToEdit?.data[field.name as keyof AllFieldTypes] || defaultData,
                options: (field as SelectField).options || undefined,
              }
            }),
          }

          setFormData(initialFormData)
        } catch (error: any) {
          setErrors({ errorMessage: error.message || "Failed to load collection data" })
        }
      }
    }

    fetchCollectionAndPopulate()
  }, [collectionName, itemToEdit])

  useEffect(() => {
    if (collection && formData?.fields) {
      const collectionNames = collection.fields.reduce((acc: { name: string; index: number }[], field, index) => {
        if (field.typeName === "CollectionReference" && (field as CollectionReferenceField).options && (field as CollectionReferenceField).options.length > 0) {
          acc.push({ name: (field as CollectionReferenceField).options[0], index })
        }
        return acc
      }, [])

      collectionNames.forEach(async ({ name, index }) => {
        console.log(`Fetching items for collection: ${name} (index: ${index})`)
        const itemIds = await fetchItemsIds(name, index)
        console.log({ itemIds })
        const newFormData = { ...formData }
        console.log({ index, itemIds })
        newFormData.fields[index].options = itemIds
        console.log({ newFormData })
        setFormData(newFormData)
      })
    }
  }, [Boolean(collection && formData?.fields)])

  const fetchItemsIds = async (collectionName: string, fieldIndex: number) => {
    try {
      const response = await fetch(`/api/bucket/item/ids/read?collectionName=${collectionName}`)
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      console.log(`Items for collection: ${collectionName} (index: ${fieldIndex})`, data.itemIds)
      return data.itemIds as string[]
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  const handleSubmit = async () => {
    if (!formData) {
      setErrors({ errorMessage: "Please provide some data" })
      return
    }

    let allComponentsValid = true
    const newErrors: string[] = []

    formData.fields.forEach((field, index) => {
      const fieldType = collection?.fields[index]?.typeName

      if (!fieldType) {
        allComponentsValid = false
        newErrors[index] = "Some fields are missing."
        return
      }

      const fieldTypeSchema = FieldTypes[fieldType as keyof typeof FieldTypes]?.schema
      if (fieldTypeSchema) {
        try {
          fieldTypeSchema.parse(field.data)
          // validation successful
        } catch (error: any) {
          allComponentsValid = false
          newErrors[index] = error.message || `Validation failed for ${field.name}`
        }
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
      itemName: (formData.fields[0].data as TextData).value,
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
    <>
      {collection && (
        <Transition appear={true} show={true} enter="transition-all duration-150" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0">
          <div className="p-8 bg-white sm:rounded-xl shadow-md max-w-[480px] mx-auto">
            <h3 className="uppercase opacity-50 text-sm pb-1">{collectionName}</h3>
            <h2 className="text-3xl pb-8">{itemToEdit ? "Edit Item" : "Create New Item"}</h2>

            {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

            {collection && formData?.fields && (
              <div className="">
                <div className="flex flex-col gap-8">
                  {formData?.fields.map((field, index) => {
                    const fieldTypeKey = collection.fields[index].typeName as keyof typeof FieldTypes
                    const fieldType = FieldTypes[fieldTypeKey]

                    if (!fieldType) {
                      return (
                        <div key={index} className="text-red-500">
                          Field type not found!
                        </div>
                      )
                    }

                    let fieldDataShape = isZodObjectOrArray(fieldType.schema) ? fieldType.schema.shape : null

                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <Label className="block opacity-70 font-medium">{field.name}</Label>
                        {isZodObjectOrArray(fieldType.schema) ? (
                          fieldType.renderAdmin({
                            data: field.data as typeof fieldDataShape,
                            setData: (updatedData) => {
                              setFormData((prev) => {
                                if (!prev) return null
                                const newData = { ...prev }
                                newData.fields[index].data = updatedData
                                return newData
                              })
                            },
                            options: field.options || [],
                          })
                        ) : (
                          <div className="p-2 bg-red-100 text-red-700 border border-red-300 rounded">Error: Invalid field type schema.</div>
                        )}
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
        </Transition>
      )}
    </>
  )
}

export default ItemForm
