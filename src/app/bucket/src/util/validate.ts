import { z } from "zod"
import { Collection, ItemFormData, ItemFormFieldData } from "../types"
import * as FieldTypes from "../field-types"

interface ValidationResponse {
  allFieldsValid: boolean
  newErrors: string[]
}

export function isZodObjectOrArray(schema: any): schema is z.ZodObject<any> {
  return schema && (typeof schema.shape === "object" || schema instanceof z.ZodArray)
}

export function validateFields(formData: ItemFormData, collection: Collection | null | undefined): ValidationResponse {
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
        const validationResult = fieldTypeSchema.safeParse(field.data)
        if (validationResult.success) {
          return { isValid: true }
        } else {
          return {
            isValid: false,
            errorMessage: validationResult.error.issues[0]?.message || "Invalid data",
          }
        }
        // validation successful
      } catch (error: any) {
        allFieldsValid = false
        newErrors[index] = error.message[0]?.message || `Validation failed for ${field.name}`
      }
    }
  })

  return { allFieldsValid, newErrors }
}

export function isValidJSX(str: string) {
  try {
    parser.parse(str, {
      sourceType: "module",
      plugins: ["jsx"],
    })
    return true
  } catch (e) {
    return false
  }
}
