"use client"
import React, { useEffect } from "react"
import { CollectionFieldsData } from "../../types"
import { generateSampleDataItem, generateSampleDataItems } from "../../util"
import { Badge } from "../../ui"
import { useCollectionAccessSettings } from "../../hooks/useCollectionAccessSettings"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

const PublicAPI = () => (
  <>
    <Badge className="scale-90 bg-green-500 hover:bg-green-500 hover:no-underline !no-underline">Public</Badge>
    <span className="pt-1 text-sm text-gray-500">Users do not need to be logged in to use this API</span>
  </>
)

const PrivateAPI = () => (
  <>
    <Badge className="scale-90 bg-black opacity-60 hover:bg-black hover:no-underline !no-underline">Auth Required</Badge>
    <span className="pt-1 text-sm text-gray-500">Users need to be logged in in to use this API</span>
  </>
)

function CollectionDataClient({ collection }: { collection: CollectionFieldsData }) {
  const { collectionAccess } = useCollectionAccessSettings()

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full">
      <div>
        <div className="mt-6">
          <div className="text-blue-600 text-2xl hover:no-underline">
            <div className="inline-flex gap-2">
              <span className="font-semibold">Read API</span>
              {collectionAccess && <>{collectionAccess.publicBlockRead.includes(collection.name) ? <PrivateAPI /> : <PublicAPI />}</>}
            </div>
          </div>
          <div>
            <p>
              API route for client to fetch data for a{" "}
              <strong>
                <em>single Item</em>
              </strong>{" "}
              in a Collection.
            </p>
            <div className="italic -mb-4">Endpoint:</div>
            <pre className="mb-4">
              <code className="font-bold">GET: /api/bucket/item/read?collectionName={encodeURIComponent(collection.name)}&itemId=123</code>
            </pre>
            <div>
              <span className="italic">Parameters:</span>{" "}
              <ul className="-mt-1">
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  Collection
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
              API route for client fetch data for{" "}
              <strong>
                <em>multiple Items</em>
              </strong>{" "}
              in a Collection.
            </p>
            <div className="italic -mb-4">Endpoint:</div>
            <pre className="!opacity-100 !bg-gray-100 mb-4">
              <code className="font-bold">GET: /api/bucket/items/read?collectionName={encodeURIComponent(collection.name)}&token=123</code>
            </pre>
            <div>
              <span className="italic">Parameters:</span>{" "}
              <ul className="-mt-1">
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  Collection
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">token</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - Continuation token to mark
                  pagination
                </li>
              </ul>
            </div>
            <div className="italic">Response:</div>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{generateSampleDataItems(collection)}</code>
            </pre>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="text-blue-600 text-2xl hover:no-underline">
            <div className="inline-flex gap-2">
              <span className="font-semibold">Create API</span>
              {collectionAccess && <>{collectionAccess.publicAllowWrite.includes(collection.name) ? <PublicAPI /> : <PrivateAPI />}</>}
            </div>
          </div>
          <div>
            <p>API route for client to create a new Item in a Collection. Users are required have an active authenticated session.</p>
            <div className="italic -mb-4">Endpoint:</div>
            <pre className="mb-4">
              <code className="font-bold">POST: /api/bucket/item/create</code>
            </pre>
            <div>
              <span className="italic">Parameters:</span>{" "}
              <ul className="-mt-1">
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  Collection ("{collection.name}")
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">itemName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  {collection.name} Item
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">data</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">Field[]</span> - An array of field data for{" "}
                  {collection.name}
                </li>
              </ul>
            </div>
            <div className="italic">Response:</div>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{`{
  "success": true,
  "itemId": "item-name-slug"
}`}</code>
            </pre>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="text-blue-600 text-2xl">
            <div className="inline-flex gap-2">
              <span className="font-semibold">Update API</span>
              {collectionAccess && <>{collectionAccess.publicAllowWrite.includes(collection.name) ? <PublicAPI /> : <PrivateAPI />}</>}
            </div>
          </div>
          <div>
            <p>API route for client to update Item data in a Collection.</p>
            <div className="italic -mb-4">Endpoint:</div>
            <pre className="mb-4">
              <code className="font-bold">POST: /api/bucket/item/update</code>
            </pre>
            <div>
              <span className="italic">Parameters:</span>{" "}
              <ul className="-mt-1">
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  Collection ("{collection.name}")
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">itemName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  {collection.name} Item
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">data</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">Field[]</span> - An array of field data for{" "}
                  {collection.name}
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">itemId</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item
                </li>
              </ul>
            </div>
            <div className="italic">Response:</div>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{`{
  "success": true,
  "itemId": "item-name-slug"
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionDataClient
