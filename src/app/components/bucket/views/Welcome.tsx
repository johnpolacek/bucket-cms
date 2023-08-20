"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./CollectionsIntro"
import EnvironmentStatus from "./EnvironmentStatus"
import { ConfigValidation } from "../types"
import CollectionsAdmin from "./CollectionsAdmin"

function Welcome({ onCreateCollection }: { onCreateCollection: () => void }) {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [collectionNames, setCollectionNames] = useState<undefined | string[]>(undefined)
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
    setCollectionNames(responseData.collectionNames)
  }

  return (
    <>
      {configValidation && (
        <>
          {isConfigured ? (
            collectionNames ? (
              collectionNames.length ? (
                <CollectionsAdmin collectionNames={collectionNames} />
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
