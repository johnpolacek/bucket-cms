import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionInstall() {
  return (
    <DocsSection id="install" title="Install">
      <p>
        Use <span className="font-mono font-bold">create-bucket-cms</span>, the Bucket CMS CLI tool to add it to your Next.js project (requires Next.js version 13+ with App Router).
      </p>
      <pre className="w-1/2">
        <code className="language-sh">npx create-bucket-cms</code>
      </pre>
      <p>
        During the installation process, you will be asked to provide credentials for AWS that will be saved as environment variables to your local file system. You can skip this step and add them
        yourself. Refer to the{" "}
        <a href="https://github.com/johnpolacek/bucket-cms/blob/main/.env.local.example" className="font-mono text-sm font-bold text-blue-600">
          .env.local.example
        </a>{" "}
        for the specific variables that are required.
      </p>
    </DocsSection>
  )
}

export default DocsSectionInstall
