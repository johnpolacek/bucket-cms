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
  const isConfigured = Boolean(configValidation?.hasAWSSecret && configValidation?.hasAWSRegion && configValidation?.hasAWSBucket)
  const [refreshToken, setRefreshToken] = useState(0)

  const [collections, isLoading, error, missingBucket] = useFetchCollectionsCount(isConfigured, refreshToken)

  useEffect(() => {
    getConfigValidation()
  }, [])

  const getConfigValidation = async () => {
    const configValidationResponse = await fetch("/api/bucket/config/read")
    const configValidationResponseData = await configValidationResponse.json()
    setConfigValidation(configValidationResponseData)
  }

  return (
    <main className={`flex flex-col grow items-center relative w-full h-full ${isLoading && "hidden"}`}>
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
