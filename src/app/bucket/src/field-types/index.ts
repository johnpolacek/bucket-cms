export * from "./Text"
export * from "./RichText"
export * from "./ImageUpload"

import { TextData } from "./Text"
import { RichTextData } from "./RichText"
import { ImageData } from "./ImageUpload"

export type AllFieldTypes = TextData | RichTextData | ImageData
