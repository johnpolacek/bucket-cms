"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui"
import { Collection, CollectionData, Field, FieldBlank, SelectField, CollectionReferenceField, FieldKeys } from "../../types"
import ItemFormPreview from "./ItemFormPreview"
import { ErrorState } from "./CollectionFormField"
import CollectionNameSelect from "./CollectionNameSelect"
import CollectionNameEdit from "./CollectionNameEdit"
import CollectionItemNameSelect from "./CollectionItemNameSelect"
import CollectionFieldNewDialog from "./CollectionFieldNewDialog"
import { cn } from "../../ui/utils"
import CollectionFormFieldSort from "./CollectionFormFieldSort"

function CollectionForm({ collection = null, onCancel, onComplete }: { collection?: Collection | null; onCancel: () => void; onComplete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [fields, setFields] = useState<(Field | FieldBlank)[]>([])
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = Boolean(collection)

  useEffect(() => {
    if (collection) {
      setFields(collection.fields)
    }
  }, [])

  const onAddNewField = (fieldName: string, fieldType: FieldKeys) => {
    setErrors({})
    const newField = { name: fieldName, typeName: fieldType }
    if (fieldType === "SelectField") {
      ;(newField as SelectField).options = []
    }
    if (fieldType === "CollectionReference") {
      ;(newField as CollectionReferenceField).options = []
    }
    const newFields = [...fields]
    newFields.push(newField)
    setFields(newFields)
  }

  const validateForm = () => {
    const newErrors: ErrorState = {}

    // Validate collection name
    if (!collectionName) {
      newErrors.name = "Collection name is required!"
    }

    // Validate fields
    const fieldErrors = fields
      .map((field, index) => {
        if (!field.name || !field.typeName) {
          return `Field #${index + 1}: Please complete selecting field type and name`
        }
        if ((field as SelectField).options) {
          if ((field as SelectField).options.length < 1) {
            return `Field #${index + 1}: Please provide an option`
          }
          const emptyFieldOptions = (field as SelectField).options.filter((option) => {
            return option === ""
          })
          if (emptyFieldOptions.length !== 0 && field.typeName !== "SelectField" && field.typeName !== "CollectionReference") {
            return `Field #${index + 1}: Please provide values for all select options`
          }
        }
        return null
      })
      .filter(Boolean) as string[]

    if (fieldErrors.length) {
      newErrors.fields = fieldErrors
    }

    setErrors(newErrors)
    return !newErrors.name && fieldErrors.length === 0
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
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
            fields,
          }),
        })

        if (response.ok) {
          onComplete()
        } else {
          const errorData = await response.json()
          setErrors({
            errorMessage: errorData.error,
          })
          setIsSubmitting(false)
        }
      } catch (error) {
        setErrors({
          errorMessage: (error as Error).message || "Sorry, there was an error.",
        })
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const getCollections = async () => {
      const response = await fetch("/api/bucket/collections/count")
      const responseData = await response.json()
      setCollections(responseData.collections)
    }
    getCollections()
  }, [])

  return (
    <>
      {fields.length === 0 ? (
        <>
          {collectionName ? (
            <CollectionItemNameSelect
              onSelect={(itemName) => {
                setFields([{ name: itemName, typeName: "Text" }])
              }}
            />
          ) : (
            <CollectionNameSelect
              onSelect={(name) => {
                setCollectionName(name)
              }}
            />
          )}
        </>
      ) : (
        <div className={cn("flex flex-col items-center transition-all duration-500", fields.length > 1 ? "opacity-100" : "opacity-0")}>
          <h2 className="uppercase font-semibold text-sm tracking-wide opacity-50 pb-1">Create Collection</h2>
          <CollectionNameEdit initialValue={collectionName} onChange={(newCollectionName: string) => setCollectionName(newCollectionName)} />

          <div className="px-8 bg-white rounded border w-full max-w-[1100px] mx-auto mt-8 sm:grid sm:grid-cols-2 gap-12 lg:scale-110">
            <div className="flex flex-col gap-2 py-8 px-4">
              <CollectionFormFieldSort collections={collections} fields={fields} setFields={setFields} />

              <div className="mt-2 pl-6">
                <CollectionFieldNewDialog isFirstField={fields.length === 1} onComplete={onAddNewField} />
              </div>

              {errors.fields && (
                <div className="flex flex-col gap-1 pt-4">
                  {errors.fields.map((error, index) => (
                    <div key={index} className="text-red-500 text-sm">
                      {error}
                    </div>
                  ))}
                </div>
              )}
              {errors.errorMessage && <div className="py-4 text-red-500 text-sm">{errors.errorMessage}</div>}

              <div className="flex justify-end gap-4 mt-12 mb-8">
                <Button size="lg" disabled={isSubmitting} variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700" size="lg" disabled={isSubmitting} onClick={handleSubmit}>
                  Save Collection
                </Button>
              </div>
            </div>
            <ItemFormPreview collectionName={collectionName} fields={fields} />
          </div>
        </div>
      )}
    </>
  )
}

export default CollectionForm
