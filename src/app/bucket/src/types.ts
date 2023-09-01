import { z } from "zod"
import { ReactElement } from "react"
import { AllFieldTypes } from "./field-types"
import * as FieldTypesModule from "./field-types"

export interface ConfigValidation {
  hasAWSAccess: boolean
  hasAWSSecret: boolean
  hasAWSRegion: boolean
  hasAWSBucket: boolean
}

export type FieldKeys = keyof typeof FieldTypesModule
export type SetDataFunction<T> = (data: Partial<T>) => void
export interface FieldType<T> {
  schema: z.ZodType<T, any, any>
  renderAdmin: ({ data, setData }: FieldTypeProps<T>) => ReactElement
  validate: (data: T) => { isValid: boolean; errorMessage?: string }
}

export interface FieldTypeProps<T> {
  data: T
  setData: SetDataFunction<Partial<T>>
}

export type FieldTypes = Record<FieldKeys, FieldType<AllFieldTypes>>
export interface Field {
  name: string
  typeName: FieldKeys
}

export interface Collection {
  name: string
  fields: Field[]
}

export interface CollectionFetch extends Collection {} // If they are same, just extend. Otherwise, keep them separate.

export interface AvailableFieldType<T = any> {
  name: string
  component: FieldType<T>
}

export interface ItemFormFieldData {
  name: string
  data: Partial<AllFieldTypes> // If you're not sure of the exact shape, use Partial
}

export interface CollectionItemData {
  itemId: string
  itemName: string
  data: AllFieldTypes
}

export interface ItemFormData {
  collectionName: string
  fields: ItemFormFieldData[]
}

export interface CollectionData {
  collectionName: string
  itemCount: number
}
