import { z } from "zod"
import { Collection, ItemFormData } from "../types"
import * as FieldTypes from "../field-types"

interface ValidationResponse {
  allFieldsValid: boolean
  newErrors: string[]
}

export function isZodObjectOrArray(schema: any): schema is z.ZodObject<any> {
  return schema && (typeof schema.shape === "object" || schema instanceof z.ZodArray)
}

export const validateFields = (formData: ItemFormData, collection: Collection | null | undefined): ValidationResponse => {
  let allFieldsValid = true
  const newErrors: string[] = []

  formData.fields.forEach((field, index) => {
    const fieldType = collection?.fields[index]?.typeName

    if (!fieldType) {
      allFieldsValid = false
      newErrors[index] = "Some fields are missing."
      return
    }

    const fieldTypeSchema = FieldTypes[fieldType as keyof typeof FieldTypes]?.schema
    if (fieldTypeSchema) {
      try {
        fieldTypeSchema.parse(field.data)
        // validation successful
      } catch (error: any) {
        allFieldsValid = false
        newErrors[index] = error.message[0]?.message || `Validation failed for ${field.name}`
      }
    }
  })

  return { allFieldsValid, newErrors }
}
