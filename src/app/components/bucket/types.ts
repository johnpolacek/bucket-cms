export interface ConfigValidation {
  hasAWSAccess: boolean
  hasAWSSecret: boolean
  hasAWSRegion: boolean
  hasAWSBucket: boolean
}

export interface CollectionComponent {
  name: string
  type: string
}

export interface CollectionRow {
  components: CollectionComponent[]
}

export interface Collection {
  name: string
  layout: CollectionRow[]
}
