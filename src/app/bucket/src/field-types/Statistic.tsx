"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Label, Input } from "../ui"

const schema = z.object({
  value: z.string().min(1, "Metric cannot be empty"),
  metric: z.string().min(1, "Metric cannot be empty"),
})

export type StatisticData = z.infer<typeof schema>

export const Statistic: FieldType<StatisticData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<StatisticData>): ReactElement => {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="pl-px opacity-60 text-xs mt-2">Value</Label>
          <Input type="text" defaultValue={data?.value || ""} onChange={(e) => setData && setData({ value: e.target.value, metric: data.metric })} />
        </div>
        <div>
          <Label className="pl-px opacity-60 text-xs mt-2">Metric</Label>
          <Input type="text" defaultValue={data?.metric || ""} onChange={(e) => setData && setData({ metric: e.target.value, value: data.value })} />
        </div>
      </div>
    )
  },
  validate: (data: StatisticData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema,
}
