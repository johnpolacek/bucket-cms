"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./CollectionsIntro"
import EnvironmentStatus from "./EnvironmentStatus"
import { ConfigValidation, Collection } from "../types"

function Welcome({ onCreateCollection }: { onCreateCollection: () => void }) {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [collections, setCollections] = useState<undefined | Collection[]>(undefined)
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
    const collectionsResponse = await fetch("/api/bucket/collections/read")
    const collectionsResponseData = await collectionsResponse.json()
    setCollections(collectionsResponseData)
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
      {configValidation && (
        <>
          {isConfigured ? (
            collections ? (
              collections.length ? (
                <div>Your Collections Here...</div>
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
