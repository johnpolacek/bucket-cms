import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { createCollectionItem } from "../../s3/operations"

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

    const result = await createCollectionItem(collectionName, itemName, data)

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.log({ error })
    return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
  }
}
