import { z } from "zod"

export function isZodObject(schema: any): schema is z.ZodObject<any> {
  return schema && typeof schema.shape === "object"
}

export function getDefaultDataFromSchema(schema: z.ZodType<any, any, any>): any {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const defaultData: any = {}
    for (const key in shape) {
      defaultData[key] = getDefaultDataFromSchema(shape[key])
    }
    return defaultData
  } else if (schema instanceof z.ZodString) {
    return ""
  } else if (schema instanceof z.ZodNumber) {
    return null // or 0, or undefined, depending on your needs
  } else {
    // Handle other zod types or throw an error if unsupported
    throw new Error("Unsupported Zod schema type")
  }
}
