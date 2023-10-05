import { NextRequest, NextResponse } from "next/server"
import { readCollectionItems } from "../../s3/operations"
import { CollectionItemData } from "../../../../../app/bucket/src/types"
import { checkPublicReadAccess } from "@/app/bucket/src/util"

export async function GET(req: NextRequest): Promise<void | NextResponse> {
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const token = req.nextUrl.searchParams.get("token") || undefined

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  const { error, response } = await checkPublicReadAccess(collectionName)
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  try {
    const items: CollectionItemData[] = await readCollectionItems(collectionName, token)
    return NextResponse.json({ items }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve items for collection ${collectionName}: ${String(error)}` }, { status: 500 })
  }
}
