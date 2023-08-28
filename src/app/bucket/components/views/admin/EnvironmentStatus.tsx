import React from "react"

import { ConfigValidation } from "../../types"

const EnvironmentStatus = ({ configValidation }: { configValidation: ConfigValidation }) => {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "unknown"
  const allMissing = !configValidation.hasAWSAccess && !configValidation.hasAWSSecret && !configValidation.hasAWSBucket && !configValidation.hasAWSRegion

  return (
    <>
      <p className="text-xl opacity-60 my-4 text-center">Looks like you need to configure your AWS and S3 environment variables.</p>
      <div className="py-6 px-16 text-center bg-white rounded-lg shadow-md my-4">
        <h2 className="text-xs mb-4">
          ENVIRONMENT
          <div className="text-xl font-bold">{hostname}</div>
        </h2>
        <div className="flex items-center mb-2 ml-2">
          <span className={`px-2 py-1 rounded ${configValidation.hasAWSAccess ? "text-green-500" : "text-red-500 scale-90"}`}>{configValidation.hasAWSSecret ? "✅" : "❌"}</span>
          <span className="mr-2">AWS_ACCESS_KEY_ID</span>
        </div>
        <div className="flex items-center mb-2 ml-2">
          <span className={`px-2 py-1 rounded ${configValidation.hasAWSSecret ? "text-green-500" : "text-red-500 scale-90"}`}>{configValidation.hasAWSSecret ? "✅" : "❌"}</span>
          <span className="mr-2">AWS_SECRET_ACCESS_KEY</span>
        </div>
        <div className="flex items-center mb-2 ml-2">
          <span className={`px-2 py-1 rounded ${configValidation.hasAWSSecret ? "text-green-500" : "text-red-500 scale-90"}`}>{configValidation.hasAWSSecret ? "✅" : "❌"}</span>
          <span className="mr-2">AWS_SECRET_ACCESS_KEY</span>
        </div>
        <div className="flex items-center mb-2 ml-2">
          <span className={`px-2 py-1 rounded ${configValidation.hasAWSBucket ? "text-green-500" : "text-red-500 scale-90"}`}>{configValidation.hasAWSBucket ? "✅" : "❌"}</span>
          <span className="mr-2">AWS_S3_BUCKET_NAME</span>
        </div>
        <div className="flex items-center mb-2 ml-2">
          <span className={`px-2 py-1 rounded ${configValidation.hasAWSRegion ? "text-green-500" : "text-red-500 scale-90"}`}>{configValidation.hasAWSRegion ? "✅" : "❌"}</span>
          <span className="mr-2">AWS_REGION</span>
        </div>
      </div>
      <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto mt-16 pb-16">
        <h2 className="text-3xl font-bold opacity-80 mb-6">Connecting to AWS + S3</h2>
        <p className="mb-4">
          Environment variables are configurable key-value pairs that store private data like API keys, region specifications, and bucket names. Instead of hardcoding this sensitive information
          directly into the application code, which poses security risks and lacks flexibility, we use environment variables to inject these values into the application.
        </p>
        {allMissing && hostname == "localhost" && (
          <p>
            To configure local environment variables with Next.js, refer to{" "}
            <a className="underline text-blue-600" href="https://nextjs.org/docs/app/building-your-application/configuring/environment-variables">
              their documentation
            </a>
            .
          </p>
        )}
        {!configValidation.hasAWSSecret && (
          <>
            <h3 className="text-2xl font-semibold opacity-70 mt-8 mb-4">AWS Access Key and AWS Secret Access Key</h3>
            <p>
              For information on where you can get your AWS Access Key and AWS Secret Access Key, refer to{" "}
              <a className="underline text-blue-600" href="https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/">
                aws.amazon.com/blogs/security/wheres-my-secret-access-key
              </a>
              . Once you have the secret, add it to the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.
            </p>
          </>
        )}
        {!configValidation.hasAWSBucket && (
          <>
            <h3 className="text-2xl font-semibold opacity-70 mt-8 mb-4">AWS S3 Bucket</h3>
            <p>
              This CMS relies on the availability of a single AWS S3 Storage Bucket to store all data and file assets.{" "}
              <a className="underline text-blue-600" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html">
                Create a bucket
              </a>{" "}
              on S3 and set its access to public, then add its name to a AWS_S3_BUCKET_NAME environment variable.
            </p>
          </>
        )}
        {!configValidation.hasAWSRegion && (
          <>
            <h3 className="text-2xl font-semibold opacity-70 mt-8 mb-4">AWS S3 Bucket Region</h3>
            <p>You can get the AWS region for your bucket from your S3 console. Add it to a AWS_S3_BUCKET_NAME environment variable.</p>
          </>
        )}
      </div>
    </>
  )
}

export default EnvironmentStatus
