import { NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "../../auth/get-session-user"
import { createCollectionItem } from "../../s3/operations"

export async function POST(req: NextRequest): Promise<void | NextResponse> {
  const sessionUser = await getSessionUser()
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !sessionUser) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  try {
    const { itemName, collectionName, data } = await req.json()

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
