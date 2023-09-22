"use client"
import React, { ReactElement, useState } from "react"
import { CollectionReferenceFieldTypeProps, FieldType } from "../types"
import { z } from "zod"
import { Input, Button } from "../ui"
import { getHumanReadableId } from "../util"
import { cn } from "../ui/utils"

const schema = z.object({
  value: z.string().min(1, "Selection cannot be empty"),
})

export type CollectionReferenceData = z.infer<typeof schema>

const CollectionReferenceAdmin: React.FC<CollectionReferenceFieldTypeProps<CollectionReferenceData>> = ({ data, setData, options }): ReactElement => {
  const [search, setSearch] = useState("")

  return (
    <div className="flex items-center">
      <div className={cn("flex flex-col grow divide-y relative overflow-hidden rounded-lg border shadow-sm", data.value ? "p-2" : "")}>
        {data.value ? (
          <div className="text-sm">
            <span className="text-green-500 scale-125 font-bold pr-1">✓</span> {getHumanReadableId(data.value)}
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <div className="text-sm opacity-60 px-4 font-medium bg-gray-100 border-r-gray-200 py-3">Find</div>
              <Input className="shadow-none border-none focus:border-none !ring-0 pl-4" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {search &&
              options.map((option, index) => (
                <Button
                  className="bg-transparent text-normal opacity-60 hover:bg-gray-100 py-3 h-auto"
                  key={index}
                  onClick={() => {
                    setData({ value: option })
                    setSearch("")
                  }}
                >
                  {getHumanReadableId(option)}
                </Button>
              ))}
          </>
        )}
      </div>
      {data.value && (
        <Button aria-label={`Pick a different item`} variant="ghost" className="text-xl ml-2 py-4 px-3 text-red-500 hover:text-red-700" onClick={() => setData({ value: "" })}>
          ×
        </Button>
      )}
    </div>
  )
}

export const CollectionReference: FieldType<CollectionReferenceData> = {
  renderAdmin: (props) => <CollectionReferenceAdmin {...props} />,
  validate: (data: CollectionReferenceData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return {
        isValid: false,
        errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
      }
    }
  },
  schema,
}
