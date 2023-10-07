"use client"
import React from "react"
import { Collection, ItemFormFieldData } from "../../types"
import { isZodObjectOrArray } from "../../util"
import * as FieldTypes from "../../field-types"
import { Label } from "../../ui"

function ItemFormField({
  collection,
  field,
  index,
  onSetData,
  fieldErrors,
}: {
  collection: Collection
  field: ItemFormFieldData
  index: number
  onSetData: (updatedData: Partial<{ value: string }>) => void
  fieldErrors: string[]
}) {
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
          setData: onSetData,
          options: field.options || [],
        })
      ) : (
        <div className="p-2 bg-red-100 text-red-700 border border-red-300 rounded">Error: Invalid field type schema.</div>
      )}
      {fieldErrors[index] && <div className="text-red-500 text-sm">{fieldErrors[index]}</div>}
    </div>
  )
}

export default ItemFormField
