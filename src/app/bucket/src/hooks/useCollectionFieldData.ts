import { useState, useEffect } from "react"
import * as FieldTypes from "../field-types"
import { Collection, CollectionFieldsData, Field } from "../types"

export const useCollectionFieldData = (collectionData: { collectionName: string }) => {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollectionAndPopulate = async () => {
      try {
        const response = await fetch(`/api/bucket/collection/read?collectionName=${collectionData.collectionName}`)
        const collectionFieldsData: CollectionFieldsData = await response.json()

        const typedFields: Field[] = collectionFieldsData.fields.map((field) => {
          const fieldTypeKey = field.typeName as keyof typeof FieldTypes
          const fieldType = FieldTypes[fieldTypeKey]
          return {
            ...field,
            type: fieldType,
          }
        })

        const typedCollection: Collection = {
          ...collectionFieldsData,
          fields: typedFields,
        }

        setCollection(typedCollection)
      } catch (error: any) {
        setError(error.message || "Failed to load collection data")
      }
    }

    fetchCollectionAndPopulate()
  }, [collectionData.collectionName])

  return { collection, error }
}
