"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input, Button } from "../ui"

const schema = z.object({
  value: z.array(z.string().nonempty("Label cannot be empty")),
})

export type LabelsData = z.infer<typeof schema>

const LabelsAdmin = ({ data, setData }: FieldTypeProps<LabelsData>): ReactElement => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValues = [...(data.value || [])]
    newValues[index] = e.target.value
    setData && setData({ value: newValues })
  }

  return (
    <div className="flex flex-col gap-2">
      {(data.value?.length ? data.value : [""]).map((label, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input type="text" value={label} onChange={(e) => handleChange(e, index)} />
          {(data.value.length > 1 || index !== 0) && (
            <Button variant="ghost" className="text-xl px-3 text-red-500 hover:text-red-600" onClick={() => setData && setData({ value: data.value.filter((_, idx) => idx !== index) })}>
              ×
            </Button>
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="text-green-600 hover:text-green-700 border-green-300 text-xs px-2 py-1 mt-2 h-auto"
          onClick={() => setData && setData({ value: [...(data.value || []), ""] })}
        >
          + Add Label
        </Button>
      </div>
    </div>
  )
}

const validateLabels = (data: LabelsData) => {
  const validationResult = schema.safeParse(data)
  if (validationResult.success) {
    return { isValid: true }
  } else {
    return {
      isValid: false,
      errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
    }
  }
}

export const Labels: FieldType<LabelsData> = {
  renderAdmin: (props) => <LabelsAdmin {...props} />,
  validate: validateLabels,
  schema,
}
