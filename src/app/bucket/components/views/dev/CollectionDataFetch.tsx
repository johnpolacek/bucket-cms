import React from "react"
import { CollectionFetch } from "../../types"

function CollectionDataFetch({ collection }: { collection: CollectionFetch }) {
  const generateSampleData = (collection: CollectionFetch) => {
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
            itemId: "8db52b92-d749-4d1b-8d28-96de3f777e31",
            itemName: "Your Item Name",
            data: mergedData,
          },
        ],
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
    <>
      <h4 className="pl-1 mt-6 mb-2 font-semibold text-lg opacity-60">Fetching Data</h4>
      <div className="flex flex-col gap-4 pl-1">
        <div>
          Endpoint:
          <br />
          <code className="font-bold text-sm">/api/bucket/items/read?collectionName=FAQs</code>
        </div>
        <div>
          <span>Response:</span>
          <div className="mt-2 w-full overflow-auto py-3 px-4 bg-white text-[#777]">
            <pre>
              <code className="font-bold text-sm">{generateSampleData(collection)}</code>
            </pre>
          </div>
        </div>
        <div>
          <span>Typescript:</span>
          <div className="mt-2 w-full overflow-auto py-3 px-4 bg-white text-[#777]">
            <pre>
              <code className="font-bold text-sm">{generateTypeScriptInterface(collection)}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionDataFetch
