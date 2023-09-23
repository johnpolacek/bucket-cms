import { NextRequest, NextResponse } from "next/server"
import { readCollectionItem } from "../../s3/operations"
import { CollectionItemData } from "../../../../bucket/src/types"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"

export async function GET(req: NextRequest) {
  if (process.env.BLOCK_API_READ_ACCESS === "true") {
    const session = await getServerSession(options)
    if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
      return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
    }
  }

  // Extracting collectionName and itemId from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const itemId = req.nextUrl.searchParams.get("itemId")

  if (!collectionName || !itemId) {
    return NextResponse.json({ error: "Both collectionName and itemId are required as query parameters" }, { status: 400 })
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
