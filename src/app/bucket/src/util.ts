import { z } from "zod"

export function isZodObject(schema: any): schema is z.ZodObject<any> {
  return schema && typeof schema.shape === "object"
}

export function getDefaultDataFromSchema(schema: z.ZodType<any, any, any>): any {
  if (!schema) {
    throw new Error("Schema is undefined")
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const defaultData: any = {}
    for (const key in shape) {
      if (!shape[key]) {
        throw new Error(`Shape for key ${key} is undefined`)
      }
      defaultData[key] = getDefaultDataFromSchema(shape[key])
    }
    return defaultData
  } else if (schema instanceof z.ZodString) {
    return ""
  } else if (schema instanceof z.ZodNumber) {
    return null // or 0, or undefined, depending on your needs
  } else if ((schema as any) instanceof z.ZodEffects) {
    // Check if the base type exists, if it does, use that
    const baseType = (schema as any)._def.baseType
    if (baseType) {
      return getDefaultDataFromSchema(baseType)
    } else {
      // If there's no base type, use a fallback value or throw an error
      return null // or whatever default you deem appropriate
    }
  } else {
    // Handle other zod types or throw an error if unsupported
    throw new Error(`Unsupported Zod schema type: ${schema.constructor.name}`)
  }
}
