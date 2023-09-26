import { NextRequest, NextResponse } from "next/server"
import { checkPrivateWriteAccess } from "../../../../../app/bucket/src/util"
import { readCollectionSchema, updateCollectionItem } from "../../s3/operations"
import { validateFields } from "../../../../../app/bucket/src/util"

export async function PUT(req: NextRequest) {
  if (req.method === "PUT") {
    try {
      const { error, response } = await checkPrivateWriteAccess(collectionName)
      if (error) {
        return response
      }

      const json = await req.json()
      const { collectionName, itemName, data, itemId } = json

      // Fetch the collection schema
      const collection = await readCollectionSchema(collectionName)
      if (!collection) {
        throw new Error("Collection not found")
      }

      // Validate the item data
      const { allFieldsValid, newErrors } = validateFields({ collectionName, fields: data }, collection)
      if (!allFieldsValid) {
        return NextResponse.json({ error: "Validation failed", errors: newErrors }, { status: 400 })
      }

      const result = await updateCollectionItem(collectionName, itemName, data, itemId)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: `${error.message || "An error occurred"}`, stack: error.stack }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 })
  }
}
