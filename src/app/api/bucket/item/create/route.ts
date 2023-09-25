import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { createCollectionItem, readCollectionSchema } from "../../s3/operations"
import { validateFields } from "../../../../../app/bucket/src/util"

export async function POST(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  try {
    const { itemName, collectionName, data } = await req.json()

    // Validate the itemName
    if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
      return NextResponse.json({ error: "Item name is required and should be a non-empty string." }, { status: 400 })
    }

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

    // If validation succeeds, proceed to create the collection item
    const result = await createCollectionItem(collectionName, itemName, data)

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.log({ error })
    return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
  }
}
