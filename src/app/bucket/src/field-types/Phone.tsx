"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const schema = z.object({
  countryCode: z
    .string()
    .regex(/^\+\d{1,3}$/, "Invalid country code format")
    .min(1, "Country code cannot be empty"),
  phoneNumber: z
    .string()
    .regex(/^[\d\s-()]+$/, "Invalid phone number format")
    .min(1, "Phone number cannot be empty"),
})

export type PhoneData = z.infer<typeof schema>

export const Phone: FieldType<PhoneData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<PhoneData>): ReactElement => {
    return (
      <div className="flex space-x-2">
        <div className="w-28 relative rounded-lg border overflow-hidden">
          <div className="bg-gray-100 absolute top-0 px-2 flex items-center h-full border-r pointer-events-none">+</div>
          <Input
            maxLength={2}
            className="pl-8 pr-2"
            type="number"
            placeholder="1"
            defaultValue={data?.countryCode || ""}
            onChange={(e) => setData && setData({ ...data, countryCode: e.target.value })}
          />
        </div>
        <Input className="grow" maxLength={10} type="tel" placeholder="" defaultValue={data?.phoneNumber || ""} onChange={(e) => setData && setData({ ...data, phoneNumber: e.target.value })} />
      </div>
    )
  },
  validate: (data: PhoneData) => {
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
