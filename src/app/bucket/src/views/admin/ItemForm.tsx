"use client"
import React, { useState, useEffect, useRef } from "react"
import { Button, Label } from "../../ui"
import { Collection, CollectionData, CollectionItemData, CollectionReferenceField, ItemFormData, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"
import { AllFieldTypes } from "../../field-types"
import { TextData } from "../../field-types/Text"
import { Transition } from "@headlessui/react"
import { isZodObjectOrArray, getDefaultDataFromSchema, validateFields } from "../../util"
import { useCollectionFieldData, useFetchItemIds } from "../../hooks"

interface CollectionNameIndexPair {
  name: string
  index: number
}

function ItemForm({ collectionData, onCancel, onComplete, itemToEdit }: { collectionData: CollectionData; onCancel: () => void; onComplete: () => void; itemToEdit?: CollectionItemData }) {
  const { collection, error } = useCollectionFieldData(collectionData)
  const [formData, setFormData] = useState<ItemFormData | undefined>({
    collectionName: collectionData.collectionName,
    fields: [],
  })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})
  const [fieldErrors, setFieldErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { fetchItemsIds, error: fetchError } = useFetchItemIds()

  const initializeFormData = (collection: Collection) => ({
    collectionName: collection.name,
    fields: collection.fields.map((field) => {
      const fieldType = FieldTypes[field.typeName as keyof typeof FieldTypes]
      const defaultData = getDefaultDataFromSchema(fieldType.schema)
      return {
        name: field.name,
        data: itemToEdit?.data[field.name as keyof AllFieldTypes] || defaultData,
        options: (field as SelectField).options || undefined,
      }
    }),
  })

  useEffect(() => {
    if (collection && !formData?.fields.length) {
      setFormData(initializeFormData(collection))
    }
  }, [collection, itemToEdit])

  const hasLoadedCollectionReferences = useRef(false) // Create a ref to track whether the effect has run

  useEffect(() => {
    if (collection && !hasLoadedCollectionReferences.current) {
      // Check if collection is not null and the effect hasn't run before
      hasLoadedCollectionReferences.current = true // Set the ref to true so the effect won't run again

      const collectionNames = collection.fields.reduce<CollectionNameIndexPair[]>((acc, field, index) => {
        if (field.typeName === "CollectionReference") {
          const collectionReferenceField = field as CollectionReferenceField
          if (collectionReferenceField.options && collectionReferenceField.options.length > 0) {
            acc.push({ name: collectionReferenceField.options[0], index })
          }
        }
        return acc
      }, [])

      ;(async () => {
        for (const { name, index } of collectionNames) {
          const itemIds = await fetchItemsIds(name)
          setFormData((prev) => {
            if (!prev || !itemIds) return prev
            const newFormData = { ...prev }
            newFormData.fields[index].options = itemIds
            return newFormData
          })
        }
      })()
    }
  }, [collection, fetchItemsIds])

  const handleSubmit = async () => {
    if (!formData) {
      setErrors({ errorMessage: "Please provide some data" })
      return
    }

    const { allFieldsValid, newErrors } = validateFields(formData, collection)
    setFieldErrors(newErrors)

    if (!allFieldsValid) {
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
      {error && <div className="py-4 text-red-500 text-sm">{error}</div>}
      {fetchError && <div className="py-4 text-red-500 text-sm">{fetchError}</div>}
      {collection && (
        <Transition appear={true} show={true} enter="transition-all duration-150" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0">
          <div className="p-8 sm:border bg-white sm:rounded-xl sm:shadow max-w-[480px] mx-auto">
            <h2 className="text-xl uppercase pb-8 text-center opacity-50">
              {itemToEdit ? "Edit " : " New "}
              {collectionData.collectionName}
            </h2>

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
                                if (!prev) return prev
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
                  <Button className="w-[140px] text-center bg-blue-500 hover:bg-blue-600" onClick={handleSubmit} disabled={isSubmitting}>
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
