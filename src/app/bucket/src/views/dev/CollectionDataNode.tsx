"use client"
import React from "react"
import { CollectionFieldsData } from "../../types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function CollectionDataNode({ collection }: { collection: CollectionFieldsData }) {
  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full pb-12">
      <h5 className="font-bold my-4">Server-Side Data Operations</h5>
      <Accordion
        onValueChange={() => {
          Prism.highlightAll()
        }}
        type="single"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-blue-600 text-xl">Read</AccordionTrigger>
          <AccordionContent>
            <p>
              The <strong>readCollectionItem</strong> utility fetches data for a single Item in a Collection.
            </p>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{`const item: CollectionItemData = await readCollectionItem("${collection.name}", "123...")`}</code>
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
            <p className="italic">Returns: CollectionItemData</p>
            <p>
              The <strong>readCollectionItems</strong> utility fetches data for a multiple Items in a Collection.
            </p>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{`const items: CollectionItemData[] = await readCollectionItems("${collection.name}")`}</code>
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
                  pagination of results
                </li>
              </ul>
            </div>
            <p className="italic">Returns: CollectionItemData[]</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-blue-600 text-xl">Update</AccordionTrigger>
          <AccordionContent>
            <p>
              The <strong>updateCollectionItem</strong> utility updates data for a single Item in a Collection.
            </p>
            <pre className="!opacity-100 !bg-gray-100">
              <code className="language-ts">{`const result = await updateCollectionItem("${collection.name}", "Your Item Name", data, "your-item-id")`}</code>
            </pre>
            <div>
              <span className="italic">Parameters:</span>{" "}
              <ul className="-mt-1">
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the
                  Collection
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">itemName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The value for the name of
                  the Item
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">data</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">Field[]</span> - An array of field data for the
                  Item
                </li>
                <li>
                  <span className="bg-gray-100 rounded font-mono text-sm p-1">itemId</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item (slugified
                  version of itemName)
                </li>
              </ul>
            </div>
            <p className="italic">
              Returns: <code>{`{ success: boolean, itemId: string}`}</code>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CollectionDataNode
