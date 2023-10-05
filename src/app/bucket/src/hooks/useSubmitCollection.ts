import { useState } from "react"
import { Field, FieldBlank } from "../types"

type SubmitCollectionResponse = [(collectionName: string, fields: (Field | FieldBlank)[], isEditMode: boolean) => Promise<boolean>, boolean, string | null]

function useSubmitCollection(): SubmitCollectionResponse {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const submitCollection = async (collectionName: string, fields: (Field | FieldBlank)[], isEditMode: boolean): Promise<boolean> => {
    setIsSubmitting(true)
    const endpoint = isEditMode ? "/api/bucket/collection/update" : "/api/bucket/collection/create"

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: collectionName,
          fields,
        }),
      })

      if (response.ok) {
        return true // Submission succeeded
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error)
        return false // Submission failed
      }
    } catch (error: any) {
      setSubmitError(error.message || "Sorry, there was an error.")
      setIsSubmitting(false)
      return false // Submission failed
    }
  }

  return [submitCollection, isSubmitting, submitError]
}

export { useSubmitCollection }
