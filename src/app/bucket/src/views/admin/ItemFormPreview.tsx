"use client"
import React, { useState, useEffect } from "react"
import { Label } from "../../ui"
import { CollectionFetch, Field, FieldBlank, SelectField } from "../../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui"
import * as FieldTypes from "../../field-types"
import { generateSampleDataItem, generateTypeScriptInterface } from "../../util"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function ItemFormPreview({ collectionName, fields }: { collectionName: string; fields: (FieldBlank | Field)[] }) {
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    Prism.highlightAll()
  }, [refresh])

  const collection: CollectionFetch = {
    name: collectionName,
    fields,
  }

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
    <div className="hidden sm:flex flex-col gap-2 py-8 pl-16 pr-8 rounded border-l">
      <Tabs defaultValue="form" className="w-full text-center" onValueChange={() => setRefresh(refresh + 1)}>
        <TabsList className="gap-2">
          <TabsTrigger value="form">Form Preview</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="typescript">Typescript</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <div className="p-8 bg-white rounded border max-w-[480px] mx-auto text-left">
            {fields && (
              <div className="">
                <div className="flex flex-col gap-8">{FieldsPreview}</div>
              </div>
            )}
            {FieldsPreview.length === 0 && <div className="py-2 text-sm opacity-50 italic px-12 text-center">Your fields will appear here once you assign a name and type.</div>}
          </div>
        </TabsContent>
        <TabsContent value="schema">
          <pre className="!opacity-100 rounded !bg-gray-50 text-left p-2 !text-sm">
            <code className="language-ts">{generateSampleDataItem(collection)}</code>
          </pre>
        </TabsContent>
        <TabsContent value="typescript">
          <pre className="!opacity-100 rounded !bg-gray-50 text-left p-2 !text-sm">
            <code className="language-ts">{generateTypeScriptInterface(collection)}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ItemFormPreview
