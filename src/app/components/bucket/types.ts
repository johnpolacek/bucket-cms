import { z } from "zod"

export interface ConfigValidation {
  hasAWSAccess: boolean
  hasAWSSecret: boolean
  hasAWSRegion: boolean
  hasAWSBucket: boolean
}

export interface ComponentData {
  [key: string]: any
}

export type SetDataFunction<T extends ComponentData> = (data: Partial<T>) => void

export interface BaseComponent<T extends ComponentData> {
  type: string
  render: (data: T) => JSX.Element
  renderAdmin: (data: T, setData: SetDataFunction<T>) => JSX.Element
  validate: (data: ComponentData) => boolean
  defaultData: ComponentData
}
export interface Collection<T extends ComponentData> {
  name: string
  layout: CollectionRow<T>[]
}

export interface CollectionRow<T extends ComponentData> {
  columns: CollectionItem<T>[]
}

export interface CollectionRowDraft<T extends ComponentData> {
  columns: (CollectionItemDraft<T> | undefined)[]
}

export interface CollectionItem<T extends ComponentData> {
  name: string
  component: BaseComponent<T>
}

export interface CollectionItemDraft<T extends ComponentData> {
  name?: string
  component?: BaseComponent<T>
}
