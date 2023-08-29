import { z } from "zod"
import { ReactElement } from "react"

export interface ConfigValidation {
  hasAWSAccess: boolean
  hasAWSSecret: boolean
  hasAWSRegion: boolean
  hasAWSBucket: boolean
}

export interface ComponentData {
  [key: string]: any
}

export interface CollectionData {
  collectionName: string
  itemCount: number
}

export type SetDataFunction<T extends ComponentData> = (data: Partial<T>) => void

export interface FieldType<T> {
  schema: z.ZodType<T, any, any>
  renderAdmin: ({ data, setData, Component }: FieldTypeProps<T>) => ReactElement
  validate: (data: T) => { isValid: boolean; errorMessage?: string }
}

export interface FieldTypes {
  [key: string]: FieldType<any>
}

export interface FieldTypeProps<T> {
  data: T
  setData?: SetDataFunction<T>
  Component?: React.FC<{ data: T; setData?: SetDataFunction<T> }>
}

export interface AvailableFieldType<T> {
  name: string
  component: FieldType<T>
}

export interface Collection<T = any> {
  name: string
  fields: Field<T>[]
}

export interface CollectionFetch {
  name: string
  fields: {
    name: string
    typeName: string
  }[]
}

export interface Field<T = any> {
  name: string
  type: FieldType<T>
  typeName: string
}

export interface CollectionItemData {
  itemId: string
  itemName: string
  data: ComponentData
}

export interface ItemFormData {
  collectionName: string
  fields: ItemFormFieldData[]
}

export interface ItemFormFieldData {
  name: string
  data: ComponentData
}
