"use client"
import React, { useEffect } from "react"
import { CollectionFieldsData } from "../../types"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function CollectionDataNode({ collection }: { collection: CollectionFieldsData }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full">
      <h5 className="font-bold my-4">Server-Side Data Fetching</h5>
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
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
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
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">token</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - Continuation token to mark pagination
            of results
          </li>
        </ul>
      </div>
      <p className="italic">Returns: CollectionItemData[]</p>
    </div>
  )
}

export default CollectionDataNode
