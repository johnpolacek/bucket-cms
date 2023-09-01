"use client"
import React, { useState } from "react"
import { Transition } from "@headlessui/react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui"
import { Collection, Field, AvailableFieldType } from "../../types"
import * as FieldTypes from "../../field-types"

type ErrorState = {
  name?: string
  fields?: string[]
  errorMessage?: string
}

type FieldBlank = {
  name: string
  typeName: string
}

function CollectionForm({ collection = null, onCancel, onComplete, onDelete }: { collection?: Collection | null; onCancel: () => void; onComplete: () => void; onDelete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [fields, setFields] = useState<(Field | FieldBlank)[]>(collection ? collection.fields : [{ name: "", typeName: "" }])
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = Boolean(collection)

  const availableFieldTypes: AvailableFieldType<any>[] = Object.entries(FieldTypes).map(([name, component]) => ({
    name,
    component,
  }))

  const addField = () => {
    setErrors({})
    setFields([...fields, { name: "", typeName: "" }])
  }

  const handleFieldTypeChange = (index: number, typeName: string) => {
    const updatedFields = [...fields]
    const matchingFieldType = availableFieldTypes.find((ft) => ft.name === typeName)

    if (matchingFieldType) {
      updatedFields[index].typeName = matchingFieldType.name
    }
    setErrors({})
    setFields(updatedFields)
  }

  const handleDeleteField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setErrors({})
    setFields(updatedFields)
    onDelete()
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
            fields: fields.map((f) => ({ name: f.name, typeName: f.typeName })),
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

  return (
    <Transition
      className="p-8 bg-white rounded-lg shadow-md w-full max-w-[640px] flex flex-col gap-2 mx-auto mt-8"
      appear={true}
      show={true}
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
    >
      <h1 className="text-3xl font-semibold pb-8">Create a New Collection</h1>

      <Label htmlFor="collectionName">Collection Name</Label>
      <Input name="collectionName" type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="Enter collection name" />
      {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

      <Label className="pt-4">Fields</Label>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={index} className="flex w-full gap-2">
            <Input
              className={`w-2/3 text-sm py-1 px-2 ${errors.fields && !field.name ? "border-red-500" : ""}`}
              type="text"
              value={field.name || ""}
              onChange={(e) => {
                const updatedFields = [...fields]
                updatedFields[index].name = e.target.value
                setFields(updatedFields)
              }}
              placeholder="Field Name"
            />
            <Select
              onValueChange={(value) => handleFieldTypeChange(index, value)}
              value={field?.typeName} // Use typeName to display the name of the FieldType
            >
              <SelectTrigger className={`w-[240px] bg-white ${errors.fields && !field.typeName ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select FieldType" />
              </SelectTrigger>
              <SelectContent>
                {availableFieldTypes.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name.replace("Field", "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fields.length > 1 && (
              <Button variant="ghost" className="text-red-600 hover:text-red-700 text-xl px-2" onClick={() => handleDeleteField(index)}>
                ×
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="text-right pt-2">
        <Button variant="outline" className="text-sm text-green-600 hover:text-green-700 border-green-300" onClick={addField}>
          + Add Field
        </Button>
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

      <div className="flex justify-end gap-4 mt-8">
        <Button size="lg" disabled={isSubmitting} variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="lg" disabled={isSubmitting} onClick={handleSubmit}>
          Save Collection
        </Button>
      </div>
    </Transition>
  )
}

export default CollectionForm
