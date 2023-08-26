"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./CollectionsIntro"
import EnvironmentStatus from "./EnvironmentStatus"
import { ConfigValidation, CollectionData } from "../types"
import CollectionsAdmin from "./CollectionsAdmin"

function Welcome({ onCreateCollection }: { onCreateCollection: () => void }) {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [collections, setCollections] = useState<undefined | CollectionData[]>(undefined)
  const isConfigured = configValidation?.hasAWSSecret && configValidation?.hasAWSRegion && configValidation?.hasAWSBucket

  useEffect(() => {
    getConfigValidation()
  }, [])

  useEffect(() => {
    if (isConfigured) {
      getCollections()
    }
  }, [isConfigured])

  const getConfigValidation = async () => {
    const configValidationResponse = await fetch("/api/bucket/config/read")
    const configValidationResponseData = await configValidationResponse.json()
    setConfigValidation(configValidationResponseData)
  }

  const getCollections = async () => {
    const response = await fetch("/api/bucket/collections/read")
    const responseData = await response.json()
    setCollections(responseData.collections)
  }

  return (
    <>
      {configValidation && (
        <>
          {isConfigured ? (
            collections ? (
              collections.length ? (
                <CollectionsAdmin collections={collections} />
              ) : (
                <CollectionsIntro onCreateCollection={onCreateCollection} />
              )
            ) : null
          ) : (
            <EnvironmentStatus configValidation={configValidation} />
          )}
        </>
      )}
    </>
  )
}

export default Welcome
