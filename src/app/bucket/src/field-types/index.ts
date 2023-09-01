export * from "./Text"
export * from "./Date"
export * from "./RichText"
export * from "./ImageUpload"

import { TextData } from "./Text"
import { DateData } from "./Date"
import { RichTextData } from "./RichText"
import { ImageData } from "./ImageUpload"

export type AllFieldTypes = TextData | DateData | RichTextData | ImageData
