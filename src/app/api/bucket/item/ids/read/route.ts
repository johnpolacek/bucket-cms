import { NextRequest, NextResponse } from "next/server"
import { readCollectionItemIDs } from "../../../s3/util"
import { getServerSession } from "next-auth"
import { options } from "../../../../../../app/bucket/options"

export async function GET(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const token = req.nextUrl.searchParams.get("token") || undefined

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    const itemIds: string[] = await readCollectionItemIDs(collectionName, token)
    return NextResponse.json({ itemIds }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to retrieve items for collection ${collectionName}: ${String(error)}` }, { status: 500 })
  }
}
