"use client"
import React, { Fragment, useState } from "react"
import { Transition } from "@headlessui/react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui"
import { Collection, Field, AvailableFieldType, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"
import { cn } from "../../ui/utils"
import ItemFormPreview from "./ItemFormPreview"

type ErrorState = {
  name?: string
  fields?: string[]
  errorMessage?: string
}

export type FieldBlank = {
  name: string
  typeName: string
  options?: string[]
}

function CollectionForm({ collection = null, onCancel, onComplete }: { collection?: Collection | null; onCancel: () => void; onComplete: () => void }) {
  const [collectionName, setCollectionName] = useState<string>(collection ? collection.name : "")
  const [fields, setFields] = useState<(Field | FieldBlank)[]>(
    collection
      ? collection.fields
      : [
          { name: "", typeName: "Text" },
          { name: "", typeName: "" },
        ]
  )
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = Boolean(collection)

  const availableFieldTypes: AvailableFieldType[] = Object.entries(FieldTypes).map(([name, component]) => ({
    name,
    component,
  }))

  const addField = () => {
    setErrors({})
    setFields([...fields, { name: "", typeName: "" }])
  }

  const addOption = (fieldIndex: number) => {
    setErrors({})
    const newFields = [...fields]
    ;(newFields[fieldIndex] as SelectField).options.push("")
    setFields(newFields)
  }

  const handleFieldTypeChange = (index: number, typeName: string) => {
    const updatedFields = [...fields]
    const matchingFieldType = availableFieldTypes.find((ft) => ft.name === typeName)

    if (matchingFieldType) {
      updatedFields[index].typeName = matchingFieldType.name
      if (updatedFields[index].typeName === "SelectField") {
        ;(updatedFields[index] as FieldBlank).options = [""]
      }
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
          if ((field as SelectField).options.length < 2) {
            return `Field #${index + 1}: Please provide at least 2 options`
          }
          const emptyFieldOptions = (field as SelectField).options.filter((option) => {
            return option === ""
          })
          if (emptyFieldOptions.length !== 0) {
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

  console.log({ fields })

  return (
    <Transition
      className="p-8 bg-white rounded-lg shadow-md w-full max-w-[1100px] mx-auto mt-8 grid grid-cols-2 gap-16"
      appear={true}
      show={true}
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold pb-8">Create a New Collection</h1>

        <Label htmlFor="collectionName">Collection Name</Label>
        <Input name="collectionName" type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="Enter collection name" />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

        <Label className="mt-4 mb-2">Fields</Label>
        <div className="flex flex-col gap-4">
          {fields.map((field, fieldIndex) => (
            <Fragment key={fieldIndex}>
              {fieldIndex === 0 && (
                <div className="text-xs opacity-60">
                  The first field in your collection is its name. For field name, enter the label you would like it to have on the Item Form, such as "Product Name", "Book Title" or "Full Name".
                </div>
              )}
              {fieldIndex === 1 && <div className="text-xs opacity-60">Add other fields to your collection.</div>}
              <div className="flex w-full gap-2 items-end">
                <div className="flex flex-col gap-2 w-2/3">
                  <Label className="opacity-60 pl-1" htmlFor="fieldName">
                    Field Name
                  </Label>
                  <Input
                    className={`w-full text-sm py-1 px-2 ${errors.fields && !field.name ? "border-red-500" : ""}`}
                    type="text"
                    name="fieldName"
                    value={field.name || ""}
                    onChange={(e) => {
                      const updatedFields = [...fields]
                      updatedFields[fieldIndex].name = e.target.value
                      setFields(updatedFields)
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <Label className="opacity-60 pl-1" htmlFor="fieldType">
                    Type
                  </Label>
                  {fieldIndex === 0 ? (
                    <Select
                      name="fieldType"
                      onValueChange={(value) => handleFieldTypeChange(fieldIndex, value)}
                      value={field?.typeName} // Use typeName to display the name of the FieldType
                      disabled={true}
                    >
                      <SelectTrigger className={`bg-white ${errors.fields && !field.typeName ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select FieldType" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="item-name" value="Text">
                          Item Name
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      name="fieldType"
                      onValueChange={(value) => handleFieldTypeChange(fieldIndex, value)}
                      value={field?.typeName} // Use typeName to display the name of the FieldType
                    >
                      <SelectTrigger className={`bg-white ${errors.fields && !field.typeName ? "border-red-500" : ""}`}>
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
                  )}
                </div>
                <Button
                  variant="ghost"
                  className={cn("text-red-600 hover:text-red-700 text-xl px-2", fieldIndex > 2 ? "" : "opacity-0 pointer-events-none")}
                  onClick={() => handleDeleteField(fieldIndex)}
                >
                  ×
                </Button>
              </div>
              {field.typeName === "SelectField" && (
                <div>
                  {(field as SelectField).options.map((option, optionIndex) => {
                    const numOptions = (field as SelectField).options.length
                    return (
                      <div key={optionIndex} className="flex w-full gap-2 items-center mt-2">
                        <Label className="w-2/3 text-right">Option {optionIndex + 1}:</Label>
                        <Input
                          onChange={(e) => {
                            handleOptionChange(fieldIndex, optionIndex, e.target.value)
                          }}
                          className="w-1/3"
                          required
                          type="text"
                          value={option}
                        />
                        <Button
                          variant="ghost"
                          className={`text-red-600 hover:text-red-700 text-xl px-2 ${numOptions > 1 ? "" : "opacity-0 pointer-events-none"}`}
                          onClick={() => handleDeleteOption(fieldIndex, optionIndex)}
                        >
                          ×
                        </Button>
                      </div>
                    )
                  })}
                  <div className="text-right my-4">
                    <Button variant="outline" className="text-xs text-white hover:text-white bg-green-500 hover:bg-green-600" onClick={() => addOption(fieldIndex)}>
                      + Add Option
                    </Button>
                    <Button variant="ghost" className="opacity-0 pointer-events-none text-xl px-3">
                      ×
                    </Button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="text-right pt-2">
          <Button variant="outline" className="text-sm text-green-600 hover:text-green-700 border-green-300" onClick={addField}>
            + Add Field
          </Button>
          <Button variant="ghost" className="opacity-0 pointer-events-none text-xl px-3">
            ×
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
          <Button className="bg-green-600 hover:bg-green-700" size="lg" disabled={isSubmitting} onClick={handleSubmit}>
            Save Collection
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-8 rounded-lg bg-gray-50">
        <div className="text-center italic opacity-60">Item Form Preview</div>
        <div className="text-center opacity-60 text-xs px-4">This is what the form will look like for creating and editing items in {collectionName ? collectionName : "this collection"}.</div>
        <div className="mt-4">
          <ItemFormPreview collectionName={collectionName} fields={fields} />
        </div>
      </div>
    </Transition>
  )
}

export default CollectionForm
