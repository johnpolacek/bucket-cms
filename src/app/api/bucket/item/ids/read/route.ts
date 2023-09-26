import { NextRequest, NextResponse } from "next/server"
import { readCollectionItemIDs } from "../../../s3/operations"
import { checkPublicReadAccess } from "@/app/bucket/src/util"

export async function GET(req: NextRequest) {
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const token = req.nextUrl.searchParams.get("token") || undefined

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  const { error, response } = await checkPublicReadAccess(collectionName)
  if (error) {
    return response
  }

  try {
    const itemIds: string[] = await readCollectionItemIDs(collectionName, token)
    return NextResponse.json({ itemIds }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve items for collection ${collectionName}: ${String(error)}` }, { status: 500 })
  }
}
