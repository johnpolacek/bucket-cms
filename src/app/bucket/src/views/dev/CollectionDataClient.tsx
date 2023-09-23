"use client"
import React, { useEffect } from "react"
import { CollectionFieldsData } from "../../types"
import { generateSampleDataItem, generateSampleDataItems } from "../../util"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function CollectionDataClient({ collection }: { collection: CollectionFieldsData }) {
  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full">
      <h5 className="font-bold my-4">Client-Side Data Operations</h5>
      <Accordion
        onValueChange={() => {
          Prism.highlightAll()
        }}
        type="single"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-blue-600 text-xl">Read API</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-blue-600 text-xl">Update API</AccordionTrigger>
          <AccordionContent>
            <p>API route for client update data for an Item in a Collection.</p>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CollectionDataClient
