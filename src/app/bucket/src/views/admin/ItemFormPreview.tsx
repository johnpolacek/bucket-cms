"use client"
import React from "react"
import { Label } from "../../ui"
import { Field, FieldBlank, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"

function ItemFormPreview({ collectionName, fields }: { collectionName: string; fields: (FieldBlank | Field)[] }) {
  const FieldsPreview = fields.reduce<React.ReactElement[]>((acc, field, index) => {
    const fieldTypeKey = field.typeName as keyof typeof FieldTypes
    const fieldType = FieldTypes[fieldTypeKey]

    if (!fieldType || !field.name) {
      return acc
    }

    const fieldComponent = (
      <div key={index} className="flex flex-col gap-2">
        <Label className="block opacity-70 font-medium">{field.name}</Label>
        {fieldType.renderAdmin({
          data: { value: "" },
          setData: () => {},
          options: (field as SelectField).options || [],
        })}
      </div>
    )
    return [...acc, fieldComponent]
  }, [])

  return (
    <div className="flex flex-col gap-2 p-8 rounded-lg bg-gray-50">
      <h3 className="uppercase opacity-50 text-xs text-center font-bold -mb-1">{collectionName}</h3>
      <div className="text-center italic opacity-60">Item Form Fields Preview</div>
      <div className="mt-4">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-[480px] mx-auto">
          {fields && (
            <div className="">
              <div className="flex flex-col gap-8">{FieldsPreview}</div>
            </div>
          )}
          {FieldsPreview.length === 0 && <div className="py-2 text-sm opacity-50 italic px-12 text-center">Your fields will appear here once you assign a name and type.</div>}
        </div>
      </div>
    </div>
  )
}

export default ItemFormPreview
