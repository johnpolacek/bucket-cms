"use client"
import React, { useState, useEffect } from "react"
import CollectionsIntro from "./admin/CollectionsIntro"
import EnvironmentStatus from "./admin/EnvironmentStatus"
import { ConfigValidation } from "../types"
import { useFetchCollectionsCount } from "../hooks"
import AdminHome from "./admin/AdminHome"
import DevHome from "./dev/DevHome"
import BucketNotFound from "./admin/BucketNotFound"
import { ViewSwitchButton } from "./ViewSwitchButton"

export type View = "ADMIN" | "DEV"

function Home(props: { view?: View; hideViewSwitch?: boolean }) {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [view, setView] = useState<View>(props.view || "ADMIN")
  const [bucketName, setBucketName] = useState("")
  const isConfigured = Boolean(configValidation?.hasAWSSecret && configValidation?.hasAWSRegion && configValidation?.hasAWSBucket)
  const [refreshToken, setRefreshToken] = useState(0)

  const [collections, isLoading, error, missingBucket] = useFetchCollectionsCount(isConfigured, refreshToken)

  useEffect(() => {
    getConfigValidation()
    getBucketName()
  }, [])

  const getConfigValidation = async () => {
    const configValidationResponse = await fetch("/api/bucket/config/read")
    const configValidationResponseData = await configValidationResponse.json()
    setConfigValidation(configValidationResponseData)
  }

  const getBucketName = async () => {
    const getBucketNameResponse = await fetch("/api/bucket/bucket/read")
    const bucketData = await getBucketNameResponse.json()
    if (bucketData.bucketName) {
      setBucketName(bucketData.bucketName)
    }
  }

  return (
    <main className={`flex flex-col grow items-center relative w-full h-full ${isLoading && "hidden"}`}>
      {bucketName && <div className="absolute top-2 right-4 text-xs bg-gray-200 px-2 py-1 text-black opacity-70">bucket: {bucketName}</div>}
      {error ? (
        missingBucket ? (
          <BucketNotFound bucketName={missingBucket} onBucketCreated={() => window.location.reload()} />
        ) : (
          <div className="py-16 text-red-600">{error.message}</div>
        )
      ) : (
        <>
          {view === "ADMIN" && (
            <div className="min-h-screen w-full">
              {!props.hideViewSwitch && <ViewSwitchButton currentView={view} onSwitch={() => setView("DEV")} />}
              {configValidation && (
                <>
                  {isConfigured ? (
                    collections ? (
                      collections.length ? (
                        isLoading ? null : (
                          <>
                            <AdminHome onUpdateCollection={() => setRefreshToken((prevToken) => prevToken + 1)} />
                          </>
                        )
                      ) : isLoading ? null : (
                        <>
                          <CollectionsIntro />
                        </>
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
              {!props.hideViewSwitch && <ViewSwitchButton currentView={view} onSwitch={() => setView("ADMIN")} />}
              <DevHome />
            </>
          )}
        </>
      )}
    </main>
  )
}

export default Home
