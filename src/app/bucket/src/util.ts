import { z } from "zod"

export function isZodObjectOrArray(schema: any): schema is z.ZodObject<any> {
  return schema && (typeof schema.shape === "object" || schema instanceof z.ZodArray)
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
  } else if (schema instanceof z.ZodArray) {
    return []
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

export function getHumanReadableId(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function uploadImageAndGetURL(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch("/api/bucket/upload/image", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.url
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload image.")
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function uploadFileAndGetURL(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/bucket/upload/file", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.url
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload file.")
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
