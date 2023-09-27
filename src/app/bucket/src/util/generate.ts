import { z } from "zod"
import { Field, FieldKeys, CollectionFieldsData, SelectField } from "../types"

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
    return null
  } else if (schema instanceof z.ZodBoolean) {
    return true
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

export const generateSamplePostDataItems = (collection: CollectionFieldsData, isUpdate?: boolean) => {
  type Data = {
    collectionName: string
    itemName: string
    data: any[]
    itemId?: string
  }
  const data: Data = {
    collectionName: collection.name,
    itemName: `Your Item name`,
    data: collection.fields.map(generateSampleItemFieldData),
  }

  if (isUpdate) {
    data["itemId"] = `your-item-name`
  }

  return JSON.stringify(data, null, 2)
}

export const generateSampleDataItems = (collection: CollectionFieldsData) => {
  return JSON.stringify(
    {
      items: [
        {
          itemId: "123",
          itemName: `Your Item name`,
          data: collection.fields.map(generateSampleItemFieldData),
        },
      ],
    },
    null,
    2
  )
}

export const generateSampleDataItem = (collection: CollectionFieldsData) => {
  return JSON.stringify(
    {
      itemName: `Your Item name`,
      data: collection.fields.map(generateSampleItemFieldData),
    },
    null,
    2
  )
}

const generateSampleItemFieldData = (field: Field, index: number) => {
  if (index === 0) {
    return { [field.name]: { value: "Your Item Name" } }
  } else if (field.typeName === "Text") {
    return { [field.name]: { value: "A plain text string." } }
  } else if (field.typeName === "RichText") {
    return { [field.name]: { value: "<p>A <strong>rich</strong> <em>text</em> string.</p>" } }
  } else if (field.typeName === "Email") {
    return { [field.name]: { value: "user@email.com" } }
  } else if (field.typeName === "Phone") {
    return { [field.name]: { countryCode: "1", phoneNumber: "2223334444" } }
  } else if (field.typeName === "Address") {
    return { [field.name]: { street: "123 Main Street", city: "Springfield", state: "IL", postalCode: "60001", country: "United States" } }
  } else {
    // You can add more field types here as needed
    return { [field.name]: { value: "Sample value for " + field.typeName } }
  }
}

export const generateTypeScriptInterface = (collection: CollectionFieldsData) => {
  const fieldsData = collection.fields.map((field: Field) => {
    console.log(field.typeName)
    if (field.typeName === "Text" || field.typeName === "Email") {
      return `    '${field.name}': { value: string; }`
    } else if (field.typeName === "RichText") {
      return `    '${field.name}': { value: string; }`
    } else if (field.typeName === "DateField") {
      return `    '${field.name}': { value: Date; }`
    } else if (field.typeName === "Labels") {
      return `    '${field.name}': { value: string[]; }`
    } else if (field.typeName === "URL") {
      return `    '${field.name}': { value: string; }`
    } else if (field.typeName === "VideoEmbed") {
      return `    '${field.name}': { value: string; }`
    } else if (field.typeName === "CollectionReference") {
      console.log(field)
      return `    '${field.name}': { value: string; } // ${(field as SelectField).options[0]} collection item id`
    } else if (field.typeName === "Toggle") {
      return `    '${field.name}': { value: boolean; }`
    } else if (field.typeName === "Phone") {
      return `    '${field.name}': { countryCode: string; phoneNumber: string; }`
    } else if (field.typeName === "Address") {
      return `    '${field.name}': { street: string; city: string; state: string; postalCode: string; country: string; }`
    } else if (field.typeName === "ImageUpload") {
      return `    '${field.name}': { url: string; alt: string; height: number; width: number; }`
    } else if (field.typeName === "ImageGallery") {
      return `    '${field.name}': { url: string; alt: string; height: number; width: number; }[]`
    } else if (field.typeName === "FileUpload") {
      return `    '${field.name}': { name: string; url: string; }`
    } else if (field.typeName === "FileLibrary") {
      return `    '${field.name}': { name: string; url: string; }[]`
    } else if (field.typeName === "Statistic") {
      return `    '${field.name}': { metric: string; value: string; }[]`
    } else if (field.typeName === "SelectField") {
      return `    '${field.name}': { value: ${(field as SelectField).options.map((item) => `"${item}"`).join(" | ")}; }`
    } else {
      // You can add more field types here as needed
      return `    '${field.name}': any;`
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
