"use client"
import React, { useState } from "react"
import { Button, Label, Input } from "../../ui"
import { Collection, CollectionItemData, ItemFormData, Field, SelectField } from "../../types"
import * as FieldTypes from "../../field-types"
import { isZodObjectOrArray } from "../../util"
import { FieldBlank } from "./CollectionForm"

function ItemFormPreview({ collectionName, fields }: { collectionName: string; fields: (FieldBlank | Field)[] }) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-[480px] mx-auto">
      <h3 className="uppercase opacity-50 text-sm pb-1">{collectionName}</h3>
      <h2 className="text-3xl pb-8">Create New</h2>

      {fields && (
        <div className="">
          <div className="flex flex-col gap-8">
            {fields.map((field, index) => {
              const fieldTypeKey = field.typeName as keyof typeof FieldTypes
              const fieldType = FieldTypes[fieldTypeKey]

              if (!fieldType || !field.name) {
                return null
              }

              return (
                <div key={index} className="flex flex-col gap-2">
                  <Label className="block opacity-70 font-medium">{field.name}</Label>
                  {isZodObjectOrArray(fieldType.schema) ? (
                    fieldType.renderAdmin({
                      data: { value: "" },
                      setData: () => {},
                      options: (field as SelectField).options || [],
                    })
                  ) : (
                    <div className="p-2 bg-red-100 text-red-700 border border-red-300 rounded">Error: Invalid field type schema.</div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="ghost">Cancel</Button>
            <Button className="w-[140px] text-center pointer-events-none opacity-30">Save Item</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemFormPreview
