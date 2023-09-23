"use client"
import React, { useEffect } from "react"
import { CollectionFieldsData } from "../../types"
import { generateSampleDataItem, generateSampleDataItems } from "../../util"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function CollectionDataClient({ collection }: { collection: CollectionFieldsData }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full">
      <h5 className="font-bold my-4">API Routes</h5>
      <p>
        API route to fetch data for a{" "}
        <strong>
          <em>single Item</em>
        </strong>{" "}
        in a Collection.
      </p>
      <div className="italic -mb-4">Endpoint:</div>
      <pre className="mb-4">
        <code>/api/bucket/item/read?collectionName={encodeURIComponent(collection.name)}&itemId=123</code>
      </pre>
      <div>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">itemId</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item
          </li>
        </ul>
      </div>
      <div className="italic">Response:</div>
      <pre className="!opacity-100 !bg-gray-100">
        <code className="language-ts">{generateSampleDataItem(collection)}</code>
      </pre>
      <p>
        API route to fetch data for{" "}
        <strong>
          <em>multiple Items</em>
        </strong>{" "}
        in a Collection.
      </p>
      <div className="italic -mb-4">Endpoint:</div>
      <pre className="!opacity-100 !bg-gray-100 mb-4">
        <code>/api/bucket/items/read?collectionName={encodeURIComponent(collection.name)}&token=123</code>
      </pre>
      <div>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">token</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - Continuation token to mark pagination
          </li>
        </ul>
      </div>
      <div className="italic">Response:</div>
      <pre className="!opacity-100 !bg-gray-100">
        <code className="language-ts">{generateSampleDataItems(collection)}</code>
      </pre>
    </div>
  )
}

export default CollectionDataClient
