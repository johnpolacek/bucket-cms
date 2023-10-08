import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionS3() {
  return (
    <DocsSection id="s3" title="Amazon S3">
      <p>
        Bucket CMS requires access to a dedicated Amazon S3 Bucket. You can set this up via your AWS console by going to “Users” on the{" "}
        <a className="underline text-blue-600" href="https://console.aws.amazon.com/iam/">
          IAM dashboard
        </a>
        , and click “Add user”.
      </p>
      <p>
        Provide a user name and select “Programmatic access” for the access type. Under permissions, select “Attach existing policies directly” then search for and select the AmazonS3FullAccess
        policy.
      </p>
      <p>
        Make sure to save the access key ID and secret access key or refer to the{" "}
        <a className="underline text-blue-600" href="https://aws.amazon.com/blogs/security/how-to-find-update-access-keys-password-mfa-aws-management-console/">
          AWS documentation
        </a>
        .
      </p>
    </DocsSection>
  )
}

export default DocsSectionS3
