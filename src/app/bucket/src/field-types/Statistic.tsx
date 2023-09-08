"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Label, Input } from "../ui"

const statisticSchema = z.object({
  value: z.string().min(1, "Metric cannot be empty"),
  metric: z.string().min(1, "Metric cannot be empty"),
})

export type Statistic = z.infer<typeof statisticSchema>

export const Statistic: FieldType<Statistic> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<Statistic>): ReactElement => {
    return (
      <div>
        <Label>Value</Label>
        <Input type="text" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value, metric: data.metric })} />
        <Label>
          Metric <small>(label)</small>
        </Label>
        <Input type="text" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ metric: e.target.value, value: data.value })} />
      </div>
    )
  },
  validate: (data: Statistic) => {
    const validationResult = statisticSchema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema: statisticSchema,
}
