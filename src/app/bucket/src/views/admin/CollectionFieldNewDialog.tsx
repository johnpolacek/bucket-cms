"use client"
import React, { useState, useEffect } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Input, Label } from "../../ui"
import TransitionWrapper from "./TransitionWrapper"
import CollectionFieldTypeChooser from "./CollectionFieldTypeChooser"
import { FieldKeys } from "../../types"

function CollectionFieldNewDialog({ isFirstField, onComplete }: { isFirstField?: boolean; onComplete: (fieldName: string, fieldType: FieldKeys) => void }) {
  const [fieldName, setFieldName] = useState("")
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(isFirstField)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (open) {
      setIsComplete(false)
    }
  }, [open])

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        setFieldName("")
        setStep(0)
      }}
    >
      <AlertDialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="text-xs text-white hover:text-white bg-green-500 hover:bg-green-600 focus-visible:ring-green-600">
          + Add Field
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[50vh] w-full max-w-[900px] p-8 focus-visible:ring-0 outline-none max-h-[96vh]">
        {!isFirstField && open && (
          <AlertDialogCancel onClick={() => setOpen(false)} aria-label="cancel" className="absolute top-0 right-0 py-4 px-6 hover:bg-transparent text-2xl h-auto border-none shadow-none font-mono">
            ×
          </AlertDialogCancel>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center uppercase text-sm tracking-wide opacity-50 pb-4">Add Field</AlertDialogTitle>
        </AlertDialogHeader>

        {step === 0 ? (
          <div>
            <Label htmlFor="fieldName" className="block pb-4 text-2xl font-bold text-blue-600 text-center">
              Enter a label for the {isFirstField ? "next" : "new"} field
            </Label>
            <Input
              className="text-lg text-center h-auto py-3 mx-auto max-w-[360px]"
              id="fieldName"
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
              autoFocus={true}
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter" && fieldName) {
                  setStep(1)
                }
              }}
            />
            {isFirstField && <p className="text-sm text-center opacity-70 pt-8 max-w-[350px] mx-auto">No worries! You can change it later.</p>}
          </div>
        ) : (
          <TransitionWrapper>
            <CollectionFieldTypeChooser
              onChoose={(selected) => {
                if (!isComplete) {
                  onComplete(fieldName, selected)
                  setOpen(false)
                }
              }}
            />
          </TransitionWrapper>
        )}
        <div className="flex flex-col items-end justify-end">
          <div>
            {step === 0 && (
              <Button disabled={!fieldName} className="block text-xl px-8 py-3 h-auto" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CollectionFieldNewDialog
