export { Text } from "./Text"
export { DateField } from "./Date"
export { SelectField } from "./Select"
export { RichText } from "./RichText"
export { ImageUpload } from "./ImageUpload"
export { ImageGallery } from "./ImageGallery"

import { TextData } from "./Text"
import { DateData } from "./Date"
import { SelectData } from "./Select"
import { RichTextData } from "./RichText"
import { ImageData } from "./ImageUpload"
import { ImageGalleryData } from "./ImageGallery"

export type AllFieldTypes = TextData | DateData | SelectData | RichTextData | ImageData | ImageGalleryData
