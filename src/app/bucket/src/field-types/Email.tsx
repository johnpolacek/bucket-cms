"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const schema = z.object({
  value: z.string().email("Invalid email address").min(1, "Email cannot be empty"),
})

export type EmailData = z.infer<typeof schema>

export const Email: FieldType<EmailData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<EmailData>): ReactElement => {
    return <Input type="email" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value })} />
  },
  validate: (data: EmailData) => {
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
