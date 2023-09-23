import { z } from "zod"
import { FieldKeys } from "./types"
import { CollectionFieldsData } from "./types"

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

export const getFieldTypeDisplayName = (fieldType: FieldKeys): string => {
  switch (fieldType) {
    case "DateField":
      return "Date"
    case "SelectField":
      return "Select"
    case "RichText":
      return "Rich Text"
    case "ImageUpload":
      return "Image"
    case "ImageGallery":
      return "Image Gallery"
    case "FileUpload":
      return "File"
    case "FileLibrary":
      return "File Library"
    case "URL":
      return "Link"
    case "VideoEmbed":
      return "Video"
    case "CollectionReference":
      return "Reference"
  }

  return fieldType
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

export const generateSampleDataItems = (collection: CollectionFieldsData) => {
  const itemsData = collection.fields.map((field: any) => {
    if (field.typeName === "Text") {
      return { [field.name]: { value: "A plain text string." } }
    } else if (field.typeName === "RichText") {
      return { [field.name]: { value: "<p>A <strong>rich</strong> <em>text</em> string.</p>" } }
    } else {
      // You can add more field types here as needed
      return { [field.name]: { value: "Sample value for " + field.typeName } }
    }
  })

  const mergedData = itemsData.reduce((acc, item) => ({ ...acc, ...item }), {})

  return JSON.stringify(
    {
      items: [
        {
          itemId: "123",
          itemName: `Your ${collection.name} Item name`,
          data: mergedData,
        },
      ],
    },
    null,
    2
  )
}

export const generateSampleDataItem = (collection: CollectionFieldsData) => {
  const itemsData = collection.fields.map((field: any) => {
    if (field.typeName === "Text") {
      return { [field.name]: { value: "A plain text string." } }
    } else if (field.typeName === "RichText") {
      return { [field.name]: { value: "<p>A <strong>rich</strong> <em>text</em> string.</p>" } }
    } else {
      // You can add more field types here as needed
      return { [field.name]: { value: "Sample value for " + field.typeName } }
    }
  })

  const mergedData = itemsData.reduce((acc, item) => ({ ...acc, ...item }), {})

  return JSON.stringify(
    {
      itemName: `Your ${collection.name} Item name`,
      data: mergedData,
    },
    null,
    2
  )
}

export const generateTypeScriptInterface = (collection: CollectionFieldsData) => {
  const fieldsData = collection.fields.map((field: any) => {
    if (field.typeName === "Text" || field.typeName === "Email") {
      return `    ${field.name}: { value: string; }`
    } else if (field.typeName === "RichText") {
      return `    ${field.name}: { value: string; }` // This can be changed to a richer type if you have one for RichText
    } else {
      // You can add more field types here as needed
      return `    ${field.name}: any;`
    }
  })

  const fieldsInterface = fieldsData.join("\n")

  return `interface CollectionItemData {
  itemId: string
  itemName: string
  data: AllFieldTypes[] // union of all possible field types
}

interface ${collection.name.split(" ").join("")}ItemData extends CollectionItemData {
  data: {
${fieldsInterface}
  };
}`
}
