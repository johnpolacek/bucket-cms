import React from "react"
import { CollectionFetch } from "../../types"

function CollectionDataFetch({ collection }: { collection: CollectionFetch }) {
  const generateSampleDataItems = (collection: CollectionFetch) => {
    const itemsData = collection.fields.map((field: any) => {
      if (field.typeName === "Text") {
        return { [field.name]: { value: "A plain text string." } }
      } else if (field.typeName === "RichText") {
        return { [field.name]: { value: "<p>A <strong>rich</strong> <em>text</em> string.</p>" } }
      } else {
        // You can add more field types here as needed
        return { [field.name]: { value: "Sample value for " + field.typeName } }
      }
    })

    const mergedData = itemsData.reduce((acc, item) => ({ ...acc, ...item }), {})

    return JSON.stringify(
      {
        items: [
          {
            itemId: "123",
            itemName: `Your ${collection.name} Item name`,
            data: mergedData,
          },
        ],
      },
      null,
      2
    )
  }

  const generateSampleDataItem = (collection: CollectionFetch) => {
    const itemsData = collection.fields.map((field: any) => {
      if (field.typeName === "Text") {
        return { [field.name]: { value: "A plain text string." } }
      } else if (field.typeName === "RichText") {
        return { [field.name]: { value: "<p>A <strong>rich</strong> <em>text</em> string.</p>" } }
      } else {
        // You can add more field types here as needed
        return { [field.name]: { value: "Sample value for " + field.typeName } }
      }
    })

    const mergedData = itemsData.reduce((acc, item) => ({ ...acc, ...item }), {})

    return JSON.stringify(
      {
        itemName: `Your ${collection.name} Item name`,
        data: mergedData,
      },
      null,
      2
    )
  }

  const generateTypeScriptInterface = (collection: CollectionFetch) => {
    const fieldsData = collection.fields.map((field: any) => {
      if (field.typeName === "Text") {
        return `    ${field.name}: { value: string; }`
      } else if (field.typeName === "RichText") {
        return `    ${field.name}: { value: string; }` // This can be changed to a richer type if you have one for RichText
      } else {
        // You can add more field types here as needed
        return `    ${field.name}: any;`
      }
    })

    const fieldsInterface = fieldsData.join("\n")

    return `interface CollectionItem {
  itemId: string;
  itemName: string;
  data: {
${fieldsInterface}
  };
}`
  }

  return (
    <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70 w-full">
      <div className="italic -mb-6">Typescript:</div>
      <pre>
        <code className="text-sm">{generateTypeScriptInterface(collection)}</code>
      </pre>
      <h5 className="font-bold pt-8 mb-8">Server-Side Data Fetching</h5>
      <p>
        The <strong>readCollectionItem</strong> utility fetches data for a single Item in a Collection.
      </p>
      <pre>
        <code className="text-sm">{`const item: CollectionItemData = await readCollectionItem("${collection.name}", "123...")`}</code>
      </pre>
      <p>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">itemId</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item
          </li>
        </ul>
      </p>
      <p className="italic">Returns: CollectionItemData</p>
      <p>
        The <strong>readCollectionItems</strong> utility fetches data for a multiple Items in a Collection.
      </p>
      <pre>
        <code className="text-sm">{`const items: CollectionItemData[] = await readCollectionItems("${collection.name}")`}</code>
      </pre>
      <p>
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
      </p>
      <p className="italic">Returns: CollectionItemData[]</p>

      <h5 className="font-bold pt-8 mb-4">Client-Side Data Fetching</h5>
      <div className="italic -mb-4">Endpoint:</div>
      <pre>
        <code>/api/bucket/item/read?collectionName={collection.name}&itemId=123</code>
      </pre>
      <p>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">itemId</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The id of the Item
          </li>
        </ul>
      </p>
      <div className="italic -mb-6">Response:</div>
      <pre>
        <code className="text-sm">{generateSampleDataItem(collection)}</code>
      </pre>
      <div className="italic -mb-4">Endpoint:</div>
      <pre>
        <code>/api/bucket/items/read?collectionName={collection.name}&token=123</code>
      </pre>
      <p>
        <span className="italic">Parameters:</span>{" "}
        <ul className="-mt-1">
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">collectionName</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - The name of the Collection
          </li>
          <li>
            <span className="bg-gray-100 rounded font-mono text-sm p-1">token</span> : <span className="bg-gray-100 rounded font-mono text-sm p-1">string</span> - Continuation token to mark pagination
          </li>
        </ul>
      </p>
      <div className="italic -mb-6">Response:</div>
      <pre>
        <code className="text-sm">{generateSampleDataItems(collection)}</code>
      </pre>
    </div>
  )
}

export default CollectionDataFetch
