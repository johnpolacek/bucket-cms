import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { readCollectionSchema } from "../../s3/operations"
import { Collection } from "../../../../../app/bucket/src/types"

export async function GET(req: NextRequest) {
  if (process.env.BLOCK_API_READ_ACCESS === "true") {
    const session = await getServerSession(options)
    if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
      return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
    }
  }

  // Extracting collectionName from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
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
