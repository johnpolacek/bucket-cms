"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./admin/CollectionsIntro"
import EnvironmentStatus from "./admin/EnvironmentStatus"
import { ConfigValidation, CollectionData } from "../types"
import AdminHome from "./admin/AdminHome"
import DevHome from "./dev/DevHome"
import BucketNotFound from "./admin/BucketNotFound"
import { Button } from "../ui"

type View = "ADMIN" | "DEV"

function Home(props: { view?: View; hideViewSwitch?: boolean }) {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [collections, setCollections] = useState<undefined | CollectionData[]>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<View>(props.view || "ADMIN")
  const [error, setError] = useState<string | null>(null)
  const [missingBucket, setMissingBucket] = useState("")
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
    const response = await fetch("/api/bucket/collections/count")
    const responseData = await response.json()

    if (responseData.error) {
      setError(responseData.error.message)
      if (responseData.error.bucketName) {
        setMissingBucket(responseData.error.bucketName)
      }
    } else {
      setCollections(responseData.collections)
    }

    setIsLoading(false)
  }

  return (
    <main className="flex flex-col grow items-center relative w-full h-full">
      {error ? (
        missingBucket ? (
          <BucketNotFound bucketName={missingBucket} onBucketCreated={() => window.location.reload()} />
        ) : (
          <div className="py-16 text-red-600">{error}</div>
        )
      ) : (
        <>
          {view === "ADMIN" && (
            <div className="min-h-screen w-full">
              {!props.hideViewSwitch && (
                <Button
                  onClick={() => setView("DEV")}
                  variant="outline"
                  className="absolute top-4 right-2 sm:right-8 flex items-center bg-white hover:bg-white opacity-80 hover:opacity-100 scale-90 sm:scale-100"
                >
                  <span className="hidden sm:inline pr-1">Go to </span>
                  <span> Docs</span>
                  <span className="opacity-60 text-3xl font-thin relative ml-px left-1 -top-[2px]">»</span>
                </Button>
              )}
              {configValidation && (
                <>
                  {isConfigured ? (
                    collections ? (
                      collections.length ? (
                        isLoading ? null : (
                          <>
                            <AdminHome onUpdateCollection={refreshCollections} />
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
            </div>
          )}
          {view === "DEV" && (
            <>
              {!props.hideViewSwitch && (
                <Button
                  onClick={() => setView("ADMIN")}
                  variant="outline"
                  className="absolute top-4 right-2 sm:right-8 flex items-center bg-white hover:bg-white opacity-80 hover:opacity-100 scale-90 sm:scale-100"
                >
                  <span className="opacity-60 text-3xl font-thin relative ml-px right-1 -top-[2px]">«</span>
                  <span className="hidden sm:block pr-1">Go to </span>
                  <span>Admin</span>
                </Button>
              )}
              <DevHome />
            </>
          )}
        </>
      )}
    </main>
  )
}

export default Home
