export { Text } from "./Text"
export { Labels } from "./Labels"
export { DateField } from "./Date"
export { SelectField } from "./Select"
export { RichText } from "./RichText"
export { URL } from "./URL"
export { Statistic } from "./Statistic"
export { ImageUpload } from "./ImageUpload"
export { ImageGallery } from "./ImageGallery"
export { FileUpload } from "./FileUpload"
export { FileLibrary } from "./FileLibrary"
export { VideoEmbed } from "./VideoEmbed"
export { CollectionReference } from "./CollectionReference"
import { FieldKeys } from "../types"

import { TextData } from "./Text"
import { LabelsData } from "./Labels"
import { DateData } from "./Date"
import { SelectData } from "./Select"
import { RichTextData } from "./RichText"
import { URLData } from "./URL"
import { StatisticData } from "./Statistic"
import { ImageData } from "./ImageUpload"
import { ImageGalleryData } from "./ImageGallery"
import { FileData } from "./FileUpload"
import { FileLibraryData } from "./FileLibrary"
import { VideoEmbedData } from "./VideoEmbed"
import { CollectionReferenceData } from "./CollectionReference"

export const getFieldTypeDisplayName = (fieldType: FieldKeys): string => {
  switch (fieldType) {
    case "DateField":
      return "Date"
    case "SelectField":
      return "Select"
    case "RichText":
      return "Rich Text"
    case "ImageUpload":
      return "Image"
    case "ImageGallery":
      return "Image Gallery"
    case "FileUpload":
      return "File"
    case "FileLibrary":
      return "File Library"
    case "URL":
      return "Link"
    case "VideoEmbed":
      return "Video"
    case "CollectionReference":
      return "Reference"
  }

  return fieldType
}

export type AllFieldTypes =
  | TextData
  | LabelsData
  | DateData
  | SelectData
  | RichTextData
  | URLData
  | StatisticData
  | ImageData
  | ImageGalleryData
  | FileData
  | FileLibraryData
  | VideoEmbedData
  | CollectionReferenceData
