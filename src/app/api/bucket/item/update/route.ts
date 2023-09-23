import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { updateCollectionItem } from "../../s3/util"

export async function PUT(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  if (req.method === "PUT") {
    try {
      const json = await req.json()
      const { collectionName, itemName, data, itemId } = json

      const result = await updateCollectionItem(collectionName, itemName, data, itemId)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: `${error.message || "An error occurred"}`, stack: error.stack }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 })
  }
}
