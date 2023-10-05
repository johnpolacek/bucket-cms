import { NextRequest, NextResponse } from "next/server"
import { readCollectionItem } from "../../s3/operations"
import { CollectionItemData } from "../../../../bucket/src/types"
import { checkPublicReadAccess } from "@/app/bucket/src/util"

export async function GET(req: NextRequest): Promise<void | NextResponse> {
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const itemId = req.nextUrl.searchParams.get("itemId")

  if (!collectionName || !itemId) {
    return NextResponse.json({ error: "Both collectionName and itemId are required as query parameters" }, { status: 400 })
  }

  const { error, response } = await checkPublicReadAccess(collectionName)
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  try {
    const itemData: CollectionItemData = await readCollectionItem(collectionName, itemId)
    return NextResponse.json(itemData, { status: 200 })
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "NoSuchKey") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    } else {
      return NextResponse.json({ error: `Failed to retrieve item: ${String(error)}` }, { status: 500 })
    }
  }
}
