"use client"
import React, { useState, useEffect, useRef } from "react"
import { Collection, CollectionItemData, CollectionReferenceField, ItemFormData, ItemPayload, SelectField } from "../../types"
import { getDefaultDataFromSchema, validateFields, getCollectionNamesFromFields } from "../../util"
import { useCollectionFieldData, useFetchItemIds, useCreateItem, useUpdateItem } from "../../hooks"
import { AllFieldTypes } from "../../field-types"
import { TextData } from "../../field-types/Text"
import * as FieldTypes from "../../field-types"
import { Transition } from "@headlessui/react"
import ItemFormField from "./ItemFormField"
import { useRouter } from "next/navigation"
import { Button } from "../../ui"

function ItemForm({ collectionName, onCancel, onComplete, itemToEdit }: { collectionName: string; onCancel: string; onComplete: string; itemToEdit?: CollectionItemData }) {
  const { collection, error } = useCollectionFieldData(collectionName)
  const [formData, setFormData] = useState<ItemFormData | undefined>({
    collectionName: collectionName,
    fields: [],
  })
  const [errors, setErrors] = useState<{ errorMessage?: string }>({})
  const [fieldErrors, setFieldErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { fetchItemsIds, error: fetchError } = useFetchItemIds()
  const router = useRouter()
  const { createItem } = useCreateItem()
  const { updateItem } = useUpdateItem()

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
      hasLoadedCollectionReferences.current = true

      const collectionNames = getCollectionNamesFromFields(collection.fields)

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

    try {
      let responseData
      if (itemToEdit) {
        responseData = await updateItem(payload)
      } else {
        responseData = await createItem(payload)
      }

      if (responseData.success) {
        router.push(onComplete)
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
          <div className="p-8 sm:border bg-white sm:rounded-xl sm:shadow w-full sm:w-[480px] mx-auto">
            {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}
            {formData?.fields && (
              <>
                <div className="flex flex-col gap-8">
                  {formData?.fields.map((field, index) => (
                    <ItemFormField
                      key={index}
                      collection={collection}
                      field={field}
                      fieldErrors={fieldErrors}
                      index={index}
                      onSetData={(updatedData) => {
                        setFormData((prev) => {
                          if (!prev) return prev
                          const newData = { ...prev }
                          newData.fields[index].data = updatedData
                          return newData
                        })
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <Button variant="ghost" onClick={() => router.push(onCancel)}>
                    Cancel
                  </Button>
                  <Button className="w-[140px] text-center bg-blue-500 hover:bg-blue-600" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Item"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Transition>
      )}
    </>
  )
}

export default ItemForm
