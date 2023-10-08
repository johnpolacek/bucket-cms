import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionIntroduction() {
  return (
    <DocsSection id="introduction">
      <p>Bucket CMS is a lightweight solution for simplifying content management built on the foundation of giving users full control over their content.</p>
      <p>
        Designed for Next.js, Bucket CMS utilizes a flat file system on{" "}
        <a className="text-blue-600" href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/">
          Amazon S3
        </a>{" "}
        eliminating the need for complex server and database setups while also benefiting from S3's speed, security and scalability.
      </p>
    </DocsSection>
  )
}

export default DocsSectionIntroduction
