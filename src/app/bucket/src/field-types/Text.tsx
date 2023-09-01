"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const textSchema = z.object({
  value: z.string().min(1, "Text cannot be empty"),
})

export type TextData = z.infer<typeof textSchema>

export const Text: FieldType<TextData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<TextData>): ReactElement => {
    return <Input type="text" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value })} />
  },
  validate: (data: TextData) => {
    const schema = z.object({
      value: z.string().min(1, "Text cannot be empty"),
    })
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema: textSchema,
}
