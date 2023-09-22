"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const schema = z.object({
  street: z.string().min(1, "Street address cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  state: z.string().min(1, "State cannot be empty"),
  postalCode: z.string().min(1, "Postal code cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
})

export type AddressData = z.infer<typeof schema>

export const Address: FieldType<AddressData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<AddressData>): ReactElement => {
    return (
      <div className="flex flex-col space-y-2">
        <Input type="text" placeholder="Street Address" defaultValue={data?.street || ""} onChange={(e) => setData && setData({ ...data, street: e.target.value })} />
        <Input type="text" placeholder="City" defaultValue={data?.city || ""} onChange={(e) => setData && setData({ ...data, city: e.target.value })} />
        <div className="flex gap-2">
          <Input type="text" placeholder="State" defaultValue={data?.state || ""} onChange={(e) => setData && setData({ ...data, state: e.target.value })} />
          <Input type="text" placeholder="Postal Code" defaultValue={data?.postalCode || ""} onChange={(e) => setData && setData({ ...data, postalCode: e.target.value })} />
        </div>
        <Input type="text" placeholder="Country" defaultValue={data?.country || ""} onChange={(e) => setData && setData({ ...data, country: e.target.value })} />
      </div>
    )
  },
  validate: (data: AddressData) => {
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
