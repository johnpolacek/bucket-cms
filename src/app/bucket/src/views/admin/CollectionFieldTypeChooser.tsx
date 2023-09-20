"use client"
import React from "react"
import { FieldKeys } from "../../types"
import { FieldIcon } from "../../ui/icon/field"
import { getFieldTypeDisplayName } from "../../field-types"

interface CollectionFieldSelectProps {
  type: FieldKeys
  description: string
  onChoose: (fieldType: FieldKeys) => void
  autoFocus?: boolean
}

const CollectionFieldSelect = ({ type, description, onChoose, autoFocus }: CollectionFieldSelectProps) => (
  <button
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        onChoose(type)
      }
    }}
    autoFocus={autoFocus}
    onClick={() => onChoose(type)}
    className="flex text-xl p-4 border border-blue-200 rounded-lg hover:scale-[1.025] transition-all ease-in-out outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
  >
    <div className="flex items-center justify-center bg-blue-50 rounded-lg h-10 w-10 font-bold text-blue-500">{<FieldIcon type={type} />}</div>
    <div className="grow text-left pl-4">
      <div className="font-semibold text-primary text-base">{getFieldTypeDisplayName(type)}</div>
      <div className="text-sm leading-none">{description}</div>
    </div>
  </button>
)

function CollectionFieldTypeChooser({ initial, onChoose }: { initial?: FieldKeys; onChoose: (fieldType: FieldKeys) => void }) {
  return (
    <>
      <div className="block pb-8 text-2xl font-bold text-blue-600 text-center">Choose your field type</div>
      <div className="grid grid-cols-2 gap-3">
        <CollectionFieldSelect autoFocus={initial === "Text"} type="Text" description="A plain text field" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "RichText"} type="RichText" description="Text with rich formatting options" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "SelectField"} type="SelectField" description="Choose from a group of preset options" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "Labels"} type="Labels" description="A freeform series or labels or tags" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "ImageUpload"} type="ImageUpload" description="Upload an image" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "ImageGallery"} type="ImageGallery" description="Upload a group of images" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "FileUpload"} type="FileUpload" description="Upload a file" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "FileLibrary"} type="FileLibrary" description="Upload a group of files" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "VideoEmbed"} type="VideoEmbed" description="A video embed link (YouTube or Vimeo)" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "URL"} type="URL" description="A link to a website" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "DateField"} type="DateField" description="Choose from a group of preset options" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "Statistic"} type="Statistic" description="A statistic with a metric and value" onChoose={onChoose} />
        <CollectionFieldSelect autoFocus={initial === "CollectionReference"} type="CollectionReference" description="A reference to an item in another collection" onChoose={onChoose} />
      </div>
    </>
  )
}

export default CollectionFieldTypeChooser
