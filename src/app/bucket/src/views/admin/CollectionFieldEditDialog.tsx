"use client"
import React, { useState, useEffect } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "../../ui"
import CollectionFieldTypeChooser from "./CollectionFieldTypeChooser"
import { FieldKeys } from "../../types"
import { FieldIcon } from "../../ui/icon/field"
import { EditIcon } from "../../ui/icon"
import { getFieldTypeDisplayName } from "../../util"

function CollectionFieldEditDialog({ fieldType, onComplete }: { fieldType: FieldKeys; onComplete: (fieldType: FieldKeys) => void }) {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <button aria-label="edit field type" onClick={() => setOpen(true)} className="flex items-center text-sm font-medium text-blue-500 relative top-[2px] left-1 focus-visible:ring-1">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg scale-[.66]">
            <FieldIcon type={fieldType} />
          </div>
          <span className="text-blue-600 text-sm">{getFieldTypeDisplayName(fieldType)}</span>
          <span className="opacity-75 scale-[.66] relative -top-px">
            <EditIcon />
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[50vh] max-h-screen w-full max-w-[900px] p-8 focus-visible:ring-0 outline-none">
        <AlertDialogCancel onClick={() => setOpen(false)} aria-label="cancel" className="absolute top-0 right-0 py-4 px-6 hover:bg-transparent text-2xl h-auto border-none shadow-none font-mono">
          ×
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center uppercase text-sm tracking-wide opacity-60 pb-4">Edit Field Type</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col justify-center items-center grow h-full">
            <CollectionFieldTypeChooser
              initial={fieldType}
              onChoose={(selected) => {
                setOpen(false)
                onComplete(selected)
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CollectionFieldEditDialog
