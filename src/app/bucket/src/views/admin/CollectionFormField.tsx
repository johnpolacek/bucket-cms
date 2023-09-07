"use client"
import React from "react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui"
import { Field, FieldBlank, AvailableFieldType, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"
import { cn } from "../../ui/utils"
import DragHandle from "./DragHandle"

export type ErrorState = {
  name?: string
  fields?: string[]
  errorMessage?: string
}

function CollectionFormField({
  field,
  fieldIndex,
  errors,
  handleFieldNameChange,
  handleFieldTypeChange,
  handleOptionChange,
  addOption,
  handleDeleteOption,
  handleDeleteField,
  dragHandleProps = {},
  itemProps = {},
  setNodeRef,
}: {
  field: Field | FieldBlank
  fieldIndex: number
  errors: ErrorState
  handleFieldNameChange: (fieldIndex: number, name: string) => void
  handleFieldTypeChange: (fieldIndex: number, value: string) => void
  addOption: (fieldIndex: number) => void
  handleOptionChange: (fieldIndex: number, optionIndex: number, value: string) => void
  handleDeleteOption: (fieldIndex: number, optionIndex: number) => void
  handleDeleteField: (fieldIndex: number) => void
  dragHandleProps?: any
  itemProps?: any
  setNodeRef?: any
}) {
  const availableFieldTypes: AvailableFieldType[] = Object.entries(FieldTypes).map(([name, component]) => ({
    name,
    component,
  }))

  return (
    <>
      <div ref={setNodeRef} className="flex w-full gap-2 items-end" {...itemProps}>
        <DragHandle {...dragHandleProps} />
        <div className="flex flex-col gap-1 w-2/3">
          <Label className="opacity-60 pl-1" htmlFor="fieldName">
            Field Name
          </Label>
          <Input
            className={`w-full text-sm py-1 px-2 ${errors.fields && !field.name ? "border-red-500" : ""}`}
            type="text"
            name="fieldName"
            value={field.name || ""}
            onChange={(e) => {
              handleFieldNameChange(fieldIndex, e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/3">
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
        <Button variant="ghost" className={cn("text-red-600 hover:text-red-700 text-xl px-2", fieldIndex > 1 ? "" : "opacity-0 pointer-events-none")} onClick={() => handleDeleteField(fieldIndex)}>
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
    </>
  )
}

export default CollectionFormField
