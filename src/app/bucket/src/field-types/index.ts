export { Text } from "./Text"
export { Labels } from "./Labels"
export { DateField } from "./Date"
export { SelectField } from "./Select"
export { RichText } from "./RichText"
export { Statistic } from "./Statistic"
export { ImageUpload } from "./ImageUpload"
export { ImageGallery } from "./ImageGallery"

import { TextData } from "./Text"
import { LabelsData } from "./Labels"
import { DateData } from "./Date"
import { SelectData } from "./Select"
import { RichTextData } from "./RichText"
import { StatisticData } from "./Statistic"
import { ImageData } from "./ImageUpload"
import { ImageGalleryData } from "./ImageGallery"

export type AllFieldTypes = TextData | LabelsData | DateData | SelectData | RichTextData | StatisticData | ImageData | ImageGalleryData
