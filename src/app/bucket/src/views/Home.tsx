"use client"
import React, { useState } from "react"
import CollectionsIntro from "./admin/CollectionsIntro"
import EnvironmentStatus from "./admin/EnvironmentStatus"
import { useBucketName, useConfigValidation, useFetchCollectionsCount } from "../hooks"
import AdminHome from "./admin/AdminHome"
import DevHome from "./dev/DevHome"
import BucketNotFound from "./admin/BucketNotFound"
import { ViewSwitchButton } from "./ViewSwitchButton"

export type View = "ADMIN" | "DEV"

function Home(props: { view?: View; hideViewSwitch?: boolean }) {
  const [view, setView] = useState<View>(props.view || "ADMIN")
  const [refreshToken, setRefreshToken] = useState(0)

  const { bucketName, error: bucketNameError } = useBucketName()
  const { configValidation } = useConfigValidation()
  const [collections, isLoading, error, missingBucket] = useFetchCollectionsCount(Boolean(configValidation?.isConfigured), refreshToken)

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
                  {configValidation.isConfigured ? (
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
