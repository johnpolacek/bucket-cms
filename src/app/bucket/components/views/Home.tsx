"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./admin/CollectionsIntro"
import EnvironmentStatus from "./admin/EnvironmentStatus"
import { ConfigValidation, CollectionData } from "../types"
import AdminHome from "./admin/AdminHome"
import { Button } from "../ui"

function Home() {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [collections, setCollections] = useState<undefined | CollectionData[]>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<"ADMIN" | "DEV">("ADMIN")
  const isConfigured = configValidation?.hasAWSSecret && configValidation?.hasAWSRegion && configValidation?.hasAWSBucket

  useEffect(() => {
    getConfigValidation()
  }, [])

  useEffect(() => {
    if (isConfigured) {
      refreshCollections()
    }
  }, [isConfigured])

  const getConfigValidation = async () => {
    const configValidationResponse = await fetch("/api/bucket/config/read")
    const configValidationResponseData = await configValidationResponse.json()
    setConfigValidation(configValidationResponseData)
  }

  const refreshCollections = async () => {
    setIsLoading(true)
    const response = await fetch("/api/bucket/collections/read")
    const responseData = await response.json()
    setCollections(responseData.collections)
    setIsLoading(false)
  }

  return (
    <main className="flex flex-col grow items-center bg-gray-100 py-12 relative w-full h-full">
      {configValidation && (
        <>
          {isConfigured ? (
            collections ? (
              collections.length ? (
                isLoading ? null : (
                  <>
                    {view === "ADMIN" && (
                      <>
                        <Button onClick={() => setView("DEV")} variant="outline" className="absolute top-0 right-8 flex items-center bg-white hover:bg-white opacity-80 hover:opacity-100">
                          Go to Dev View
                          <span className="opacity-60 text-3xl font-thin relative ml-px left-1 -top-[2px]">»</span>
                        </Button>
                        <AdminHome collections={collections} onCreateCollection={refreshCollections} />
                      </>
                    )}
                    {view === "DEV" && (
                      <>
                        <Button onClick={() => setView("ADMIN")} variant="outline" className="absolute top-0 right-8 flex items-center bg-white hover:bg-white opacity-80 hover:opacity-100">
                          <span className="opacity-60 text-3xl font-thin relative ml-px right-1 -top-[2px]">«</span>
                          Go to Admin View
                        </Button>
                        <div>Dev View</div>
                      </>
                    )}
                  </>
                )
              ) : (
                <CollectionsIntro onCreateFirstCollection={refreshCollections} />
              )
            ) : null
          ) : (
            <EnvironmentStatus configValidation={configValidation} />
          )}
        </>
      )}
    </main>
  )
}

export default Home
