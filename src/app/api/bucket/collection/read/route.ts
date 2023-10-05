import { NextRequest, NextResponse } from "next/server"
import { readCollectionSchema } from "../../s3/operations"
import { Collection } from "../../../../../app/bucket/src/types"
import { checkPublicReadAccess } from "../../../../bucket/src/util"

export async function GET(req: NextRequest): Promise<void | NextResponse> {
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  const { error, response } = await checkPublicReadAccess(collectionName)
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  try {
    const collection: Collection | null = await readCollectionSchema(collectionName)

    if (!collection) {
      throw new Error("Collection not found")
    }

    return NextResponse.json(collection, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: `Failed to retrieve collection: ${String(error.message || error)}` }, { status: 500 })
  }
}
