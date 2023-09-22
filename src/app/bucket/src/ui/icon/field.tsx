import React from "react"
import {
  AddressIcon,
  DateIcon,
  EmailIcon,
  FileIcon,
  FileLibraryIcon,
  ImageIcon,
  ImageGalleryIcon,
  LabelIcon,
  PhoneIcon,
  ReferenceIcon,
  RichTextIcon,
  SelectIcon,
  ToggleIcon,
  URLIcon,
  VideoIcon,
} from "."
import { FieldKeys } from "../../types"

const FieldIcon = ({ type }: { type: FieldKeys }) => {
  switch (type) {
    case "Text":
      return <span className="font-normal">Tt</span>
    case "RichText":
      return (
        <span className="scale-105">
          <RichTextIcon />
        </span>
      )
    case "SelectField":
      return (
        <span className="scale-125">
          <SelectIcon />
        </span>
      )
    case "Toggle":
      return (
        <span>
          <ToggleIcon />
        </span>
      )
    case "Labels":
      return (
        <span className="scale-110">
          <LabelIcon />
        </span>
      )
    case "ImageUpload":
      return (
        <span className="scale-105">
          <ImageIcon />
        </span>
      )
    case "ImageGallery":
      return (
        <span className="scale-105">
          <ImageGalleryIcon />
        </span>
      )
    case "FileUpload":
      return (
        <span className="scale-105">
          <FileIcon />
        </span>
      )
    case "FileLibrary":
      return (
        <span className="scale-105">
          <FileLibraryIcon />
        </span>
      )
    case "Email":
      return (
        <span className="scale-105">
          <EmailIcon />
        </span>
      )
    case "Phone":
      return (
        <span className="scale-105">
          <PhoneIcon />
        </span>
      )
    case "Address":
      return (
        <span className="scale-105">
          <AddressIcon />
        </span>
      )
    case "URL":
      return (
        <span className="scale-105">
          <URLIcon />
        </span>
      )
    case "VideoEmbed":
      return (
        <span className="scale-105">
          <VideoIcon />
        </span>
      )
    case "DateField":
      return (
        <span className="scale-105">
          <DateIcon />
        </span>
      )
    case "Statistic":
      return <span className="font-light scale-110">%</span>
    case "CollectionReference":
      return (
        <span className="scale-105">
          <ReferenceIcon />
        </span>
      )
  }
}

export { FieldIcon }
