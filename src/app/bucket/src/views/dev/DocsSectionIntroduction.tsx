import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionIntroduction() {
  return (
    <DocsSection id="introduction" title="Introduction">
      <p>Bucket CMS is a lightweight solution for simplifying content management for developers and content creators alike.</p>
      <p>
        Bucket CMS utilizes a flat file system with{" "}
        <a className="text-blue-600" href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/">
          Amazon S3
        </a>
        , designed for Next.js sites. Using a S3 bucket for your content storag simplifies the traditional CMS architecture by eliminating the need for complex server setups and databases. Content
        retrieval is fast due to the absence of database queries, and the global reach of S3 ensures consistent delivery speeds.
      </p>
      <p>Bucket CMS is built on the foundation of giving users full control over their content while also benefiting from S3's scalability, data recovery and security features.</p>
    </DocsSection>
  )
}

export default DocsSectionIntroduction
