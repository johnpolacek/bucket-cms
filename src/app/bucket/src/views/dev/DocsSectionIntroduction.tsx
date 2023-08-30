import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionIntroduction() {
  return (
    <DocsSection id="introduction" title="Introduction">
      <p>Bucket CMS is designed to simplify content management for developers and content creators alike.</p>
      <p>
        Bucket CMS utilizes a flat file system on{" "}
        <a className="text-blue-600" href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/">
          Amazon S3
        </a>
        , designed for public-facing Next.js websites. Using a single S3 bucket for all your content storage needs simplifies the traditional CMS architecture by eliminating the need for complex
        server setups and databases. As a result, content retrieval is faster due to the absence of database queries, and the global reach of S3 ensures consistent delivery speeds.
      </p>
      <p>
        The system scales with the demands of the website, benefiting from S3's scalability and security features. With built-in versioning in S3, changes are tracked, providing a mechanism for data
        recovery if needed. While meant for content that is public-facing, Bucket CMS still benefits from S3's foundational security measures, such as encryption and access controls, to prevent
        unauthorized modifications.
      </p>
    </DocsSection>
  )
}

export default DocsSectionIntroduction
