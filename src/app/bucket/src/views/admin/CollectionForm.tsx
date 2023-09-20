"use client"
import React, { Fragment, useState, useEffect } from "react"
import { Button } from "../../ui"
import { Collection, CollectionData, Field, FieldBlank, AvailableFieldType, SelectField, CollectionReferenceField, FieldKeys } from "../../types"
import * as FieldTypes from "../../field-types"
import ItemFormPreview from "./ItemFormPreview"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import CollectionFormField from "./CollectionFormField"
import { ErrorState } from "./CollectionFormField"
import CollectionNameSelect from "./CollectionNameSelect"
import CollectionNameEdit from "./CollectionNameEdit"
import CollectionItemNameSelect from "./CollectionItemNameSelect"
import CollectionFieldNewDialog from "./CollectionFieldNewDialog"

function CollectionForm({ collection = null, onCancel, onComplete }: { collection?: Collection | null; onCancel: () => void; onComplete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [fields, setFields] = useState<(Field | FieldBlank)[]>(collection ? collection.fields : [])
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editFieldType, setEditFieldType] = useState<number | null>(null)
  const isEditMode = Boolean(collection)

  const availableFieldTypes: AvailableFieldType[] = Object.entries(FieldTypes).map(([name, component]) => ({
    name,
    component,
  }))

  const addOption = (fieldIndex: number) => {
    setErrors({})
    const newFields = [...fields]
    ;(newFields[fieldIndex] as SelectField).options.push("")
    setFields(newFields)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setFields((fields) => arrayMove(fields, parseInt(active.id) + 1, parseInt(over.id) + 1))
    }
  }

  const handleFieldNameChange = (fieldIndex: number, name: string) => {
    const updatedFields = [...fields]
    updatedFields[fieldIndex].name = name
    setFields(updatedFields)
    setErrors({})
    setFields(updatedFields)
  }

  const handleFieldTypeChange = (index: number, typeName: FieldKeys) => {
    const updatedFields = [...fields]
    updatedFields[index].typeName = typeName
    if (updatedFields[index].typeName === "SelectField") {
      ;(updatedFields[index] as FieldBlank).options = [""]
    } else if (updatedFields[index].typeName !== "CollectionReference") {
      delete (updatedFields[index] as FieldBlank).options
    }
    setErrors({})
    setFields(updatedFields)
  }

  const handleOptionChange = (fieldIndex: number, optionIndex: number, value: string) => {
    const updatedFields = [...fields]
    const updatedOptions = [...(updatedFields[fieldIndex] as SelectField).options]
    updatedOptions[optionIndex] = value
    ;(updatedFields[fieldIndex] as SelectField).options = updatedOptions
    setErrors({})
    setFields(updatedFields)
  }

  const handleCollectionChange = (fieldIndex: number, value: string) => {
    const updatedFields = [...fields]
    const updatedOptions = [value]
    ;(updatedFields[fieldIndex] as CollectionReferenceField).options = updatedOptions
    setErrors({})
    setFields(updatedFields)
  }

  const handleDeleteField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setErrors({})
    setFields(updatedFields)
  }

  const handleDeleteOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...fields]
    ;(updatedFields[fieldIndex] as SelectField).options.splice(optionIndex, 1)
    setErrors({})
    setFields(updatedFields)
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
              onSelect={() => {
                setFields([{ name: collectionName, typeName: "Text" }])
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
        <div className="flex flex-col items-center">
          <h2 className="uppercase font-semibold text-sm tracking-wide opacity-50 pb-1">Create Collection</h2>
          <CollectionNameEdit initialValue={collectionName} onChange={(newCollectionName: string) => setCollectionName(newCollectionName)} />

          <div className="px-8 bg-white rounded border w-full max-w-[1100px] mx-auto mt-8 sm:grid sm:grid-cols-2 gap-12 lg:scale-110">
            <div className="flex flex-col gap-2 py-8 px-4">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.slice(1, fields.length >= 3 ? undefined : 1).map((_, index) => index.toString())} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col gap-4">
                    {fields.map((field, fieldIndex) => (
                      <Fragment key={fieldIndex}>
                        {fieldIndex === 0 ? (
                          <>
                            <label htmlFor="item-label" className="mt-4 -mb-3 opacity-70 font-medium">
                              Item Label
                            </label>
                            <CollectionFormField
                              field={field}
                              fieldIndex={fieldIndex}
                              errors={errors}
                              handleFieldNameChange={handleFieldNameChange}
                              addOption={addOption}
                              handleOptionChange={handleOptionChange}
                              handleCollectionChange={handleCollectionChange}
                              handleDeleteOption={handleDeleteOption}
                              handleDeleteField={handleDeleteField}
                              collectionReferences={collections}
                            />
                            <div className="text-xs opacity-60">
                              The first field in your collection is for the label it will have on the Item Form, such as "Product Name", "Book Title" or "Full Name".
                            </div>
                          </>
                        ) : (
                          <SortableItem index={fieldIndex - 1}>
                            {/* the 1st field item name is not sortable */}
                            <CollectionFormField
                              autoFocus={fieldIndex === fields.length - 1}
                              field={field}
                              fieldIndex={fieldIndex}
                              errors={errors}
                              handleFieldNameChange={handleFieldNameChange}
                              onFieldTypeEdit={handleFieldTypeChange}
                              addOption={addOption}
                              handleOptionChange={handleOptionChange}
                              handleCollectionChange={handleCollectionChange}
                              handleDeleteOption={handleDeleteOption}
                              handleDeleteField={handleDeleteField}
                              collectionReferences={collections}
                            />
                          </SortableItem>
                        )}
                        {fieldIndex === 0 && (
                          <>
                            <div className="mt-4 -mb-2 opacity-70 font-medium">Item Fields</div>
                            <div className="text-xs opacity-60 pb-2">Add other fields to collect data for your collection.</div>
                          </>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="mt-2 pl-6">
                <CollectionFieldNewDialog
                  isFirstField={fields.length === 1}
                  onComplete={(fieldName, fieldType) => {
                    setErrors({})
                    setFields([...fields, { name: fieldName, typeName: fieldType }])
                  }}
                />
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
