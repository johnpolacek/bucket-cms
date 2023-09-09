"use client"
import React, { ReactElement } from "react"
import { FieldType, SelectFieldTypeProps } from "../types"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui"

const selectAdminSchema = z.object({
  options: z.array(z.string()).refine((options) => options.length > 0 && !options.some((option) => option.trim() === ""), {
    message: "Array should have at least one non-empty string",
  }),
})

const schema = z.object({
  value: z.string().min(1, "Content cannot be empty"),
})

export type SelectData = z.infer<typeof schema>

const SelectAdmin: React.FC<SelectFieldTypeProps<SelectData>> = ({ data, setData, options }): ReactElement => {
  return options ? (
    <Select onValueChange={(value) => setData({ value })} defaultValue={data.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <></>
  )
}

export const SelectField: FieldType<SelectData, SelectFieldTypeProps<SelectData>> = {
  renderAdmin: (props) => <SelectAdmin {...props} />,
  validate: (data: SelectData) => {
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
