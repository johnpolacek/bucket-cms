"use client"
import React from "react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui"
import { Field, SelectField, CollectionData, CollectionReferenceField, FieldBlank, FieldKeys } from "../../types"
import { cn } from "../../ui/utils"
import DragHandle from "./DragHandle"
import CollectionFieldEditDialog from "./CollectionFieldEditDialog"

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
  onFieldTypeEdit,
  handleOptionChange,
  handleCollectionChange,
  addOption,
  handleDeleteOption,
  handleDeleteField,
  dragHandleProps = {},
  itemProps = {},
  setNodeRef,
  collectionReferences,
  autoFocus,
}: {
  field: Field | FieldBlank
  fieldIndex: number
  errors: ErrorState
  handleFieldNameChange: (fieldIndex: number, name: string) => void
  onFieldTypeEdit?: (fieldIndex: number, fieldType: FieldKeys) => void
  addOption: (fieldIndex: number) => void
  handleOptionChange: (fieldIndex: number, optionIndex: number, value: string) => void
  handleCollectionChange: (fieldIndex: number, value: string) => void
  handleDeleteOption: (fieldIndex: number, optionIndex: number) => void
  handleDeleteField: (fieldIndex: number) => void
  dragHandleProps?: any
  itemProps?: any
  setNodeRef?: any
  collectionReferences: CollectionData[]
  autoFocus?: boolean
}) {
  return (
    <>
      <div ref={setNodeRef} className="flex flex-wrap sm:flex-nowrap w-full items-end" {...itemProps}>
        {fieldIndex > 0 ? (
          <>
            <DragHandle {...dragHandleProps} />
            <div className="grow flex flex-col gap-1 w-1/2 pl-2 pt-2">
              <Label className="opacity-60 pl-1" htmlFor="fieldName">
                Field Name
              </Label>
              <Input
                autoFocus={autoFocus}
                className={`w-full text-sm py-1 px-2 ${errors.fields && !field.name ? "border-red-500" : ""}`}
                type="text"
                name="fieldName"
                value={field.name || ""}
                onChange={(e) => {
                  handleFieldNameChange(fieldIndex, e.target.value)
                }}
              />
            </div>
            <div className="grow flex flex-col gap-1 w-1/2 pl-6 sm:pl-0 sm:w-1/3">
              {field.typeName && onFieldTypeEdit && (
                <CollectionFieldEditDialog
                  fieldType={field.typeName}
                  onComplete={(newFieldType) => {
                    onFieldTypeEdit(fieldIndex, newFieldType)
                  }}
                />
              )}
            </div>
            <Button variant="ghost" className={cn("text-red-600 hover:text-red-700 text-xl p-2", fieldIndex > 1 ? "" : "opacity-0 pointer-events-none")} onClick={() => handleDeleteField(fieldIndex)}>
              ×
            </Button>
          </>
        ) : (
          <Input
            id="item-label"
            autoFocus={autoFocus}
            className={`w-full text-lg h-auto py-2 px-4 ${errors.fields && !field.name ? "border-red-500" : ""}`}
            type="text"
            name="fieldName"
            value={field.name || ""}
            onChange={(e) => {
              handleFieldNameChange(fieldIndex, e.target.value)
            }}
          />
        )}
      </div>
      {field.typeName === "CollectionReference" && (
        <div className="flex flex-col gap-1 pl-16 pr-10">
          <Label className="opacity-60 pl-1" htmlFor="collectionReference">
            Choose a Collection
          </Label>
          <Select
            name="collectionReference"
            onValueChange={(value) => handleCollectionChange(fieldIndex, value)}
            value={(field as CollectionReferenceField).options ? (field as CollectionReferenceField).options[0] : ""}
          >
            <SelectTrigger className={`bg-white ${errors.fields && !field.typeName ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent>
              {collectionReferences.map((c) => (
                <SelectItem key={c.collectionName} value={c.collectionName}>
                  {c.collectionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {field.typeName === "SelectField" && (
        <div>
          {(field as SelectField).options.map((option, optionIndex) => {
            const numOptions = (field as SelectField).options.length
            return (
              <div key={optionIndex} className="flex w-full gap-2 items-center mt-2">
                <Label className="w-2/3 text-right">Option {optionIndex + 1}:</Label>
                <Input
                  autoFocus={true}
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
            <Button variant="outline" className="text-green-600 hover:text-green-700 border-green-300 text-xs px-2 py-1 mt-2 h-auto" onClick={() => addOption(fieldIndex)}>
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
