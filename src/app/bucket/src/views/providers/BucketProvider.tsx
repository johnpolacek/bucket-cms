"use client"
import CollectionsIntro from "../admin/CollectionsIntro"
import EnvironmentStatus from "../admin/EnvironmentStatus"
import { useConfigValidation, useFetchCollectionsCount } from "../../hooks"
import BucketNotFound from "../admin/BucketNotFound"

function BucketProvider({ children }: { children: React.ReactNode }) {
  const { configValidation } = useConfigValidation()
  const [collections, isLoading, error, missingBucket] = useFetchCollectionsCount(Boolean(configValidation?.isConfigured))

  return (
    <>
      {error ? (
        missingBucket ? (
          <BucketNotFound bucketName={missingBucket} onBucketCreated={() => window.location.reload()} />
        ) : (
          <div className="py-16 text-red-600">{error.message}</div>
        )
      ) : (
        <>
          {configValidation && (
            <>
              {configValidation.isConfigured ? (
                collections ? (
                  collections.length ? (
                    isLoading ? null : (
                      <>{children}</>
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
        </>
      )}
    </>
  )
}

export default BucketProvider
