"use client"
import React, { Fragment, useState } from "react"
import { CollectionData, Field, FieldBlank, SelectField, CollectionReferenceField, FieldKeys } from "../../types"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import CollectionFormField from "./CollectionFormField"
import { ErrorState } from "./CollectionFormField"

function CollectionFormFieldSort({ collections, fields, setFields }: { collections: CollectionData[]; fields: (Field | FieldBlank)[]; setFields: (fields: (Field | FieldBlank)[]) => void }) {
  const [errors, setErrors] = useState<ErrorState>({})

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
      const newFields = arrayMove([...fields], parseInt(active.id) + 1, parseInt(over.id) + 1)
      setFields(newFields)
    }
  }

  const handleFieldNameChange = (fieldIndex: number, name: string) => {
    const updatedFields = [...fields]
    updatedFields[fieldIndex].name = name
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

  return (
    <>
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
                      The item label is for the first field on the Admin Item Form. It should be a good text identifier such as "Product Name", "Book Title" or "Full Name".
                    </div>
                  </>
                ) : (
                  <SortableItem index={fieldIndex - 1}>
                    {/* the 1st field (item name) is not sortable */}
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
                    <div className="text-xs opacity-60 pb-2">Add fields to collect data for your collection.</div>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default CollectionFormFieldSort
