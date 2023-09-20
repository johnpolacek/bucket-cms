"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Switch } from "../ui"

const schema = z.object({
  value: z.boolean(),
})

export type ToggleData = z.infer<typeof schema>

export const Toggle: FieldType<ToggleData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<ToggleData>): ReactElement => {
    return <Switch checked={data?.value || false} onCheckedChange={(checked: boolean) => setData && setData({ value: checked })} />
  },
  validate: (data: ToggleData) => {
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
