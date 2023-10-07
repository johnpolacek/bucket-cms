export * from "./auth"
export * from "./generate"
export * from "./upload"
export * from "./validate"

import { CollectionReferenceField, Field } from "../types"

export function getCollectionNamesFromFields(fields: Field[]): { name: string; index: number }[] {
  return fields.reduce<{ name: string; index: number }[]>((acc, field, index) => {
    if (field.typeName === "CollectionReference") {
      const collectionReferenceField = field as CollectionReferenceField
      if (collectionReferenceField.options && collectionReferenceField.options.length > 0) {
        acc.push({ name: collectionReferenceField.options[0], index })
      }
    }
    return acc
  }, [])
}
