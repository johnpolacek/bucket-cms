"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const schema = z.object({
  value: z.string().url("Invalid URL").min(1, "URL cannot be empty"),
})

export type URLData = z.infer<typeof schema>

export const URL: FieldType<URLData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<URLData>): ReactElement => {
    return <Input type="url" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value })} />
  },
  validate: (data: URLData) => {
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
