import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionFetchingData() {
  return (
    <DocsSection id="fetching-data" title="Fetching Data">
      <p>
        Whether you're building dynamic pages, rendering content on demand, or setting up static sites, Bucket CMS provides versatile methods to retrieve your data. Depending on your application’s
        architecture and use cases, you can choose from, or even mix and match, amongst three primary approaches:{" "}
        <strong>
          <em>Server-Side Node Functions, Client-Side API Routes & Load from S3 URL</em>
        </strong>
      </p>

      <h5 className="font-bold -mb-2">Server-Side Data Fetching</h5>
      <p>
        Bucket CMS provides a suite of utilities for server-side operations, that integrate with the{" "}
        <a className="text-blue-600" href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/">
          AWS SDK for pulling data from S3
        </a>
        . This works well with{" "}
        <a className="text-blue-600" href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch">
          server-side rendered pages with the Next.js App Router
        </a>
        .
      </p>
      <h5 className="font-bold pt-2 -mb-2">Client-Side Data Fetching</h5>
      <p>
        Bucket CMS provides a set of{" "}
        <a className="text-blue-600" href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-client-with-route-handlers">
          Next.js API Routes
        </a>{" "}
        for fetching Item data from Collections utilizing the same utility functions that are used for server-side data fetching.
      </p>
      <p>For more specifics, keep reading to check out the auto-generated documentation for your Bucket CMS integration.</p>
      <h5 className="font-bold -mb-2">Loading Data from S3</h5>
      <p>
        Unlike many CMS platforms that store your content in proprietary databases or inaccessible cloud silos, Bucket CMS saves all your data directly to your Amazon S3 bucket. This means the data is
        ultimately yours, residing in a location you control and trust. Whether you want to manipulate it directly, back it up, or migrate it to another system, you have full freedom to access,
        modify, and manage your content as you see fit.
      </p>

      <h5 className="font-mono text-lg font-bold -mb-3 pt-4">/api/bucket/items/read?collectionName=FAQ&token=123</h5>
      <p>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">token</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item
          </li>
        </ul>
      </p>
      <p className="italic">Returns: CollectionItemData[]</p>
      <p>This API endpoint returns data for multiple Items in a Collection.</p>
      <pre>
        <code className="text-sm">{`interface CollectionItemData {
  itemId: string
  itemName: string
  data: [key: string]: any
}`}</code>
      </pre>
    </DocsSection>
  )
}

export default DocsSectionFetchingData
