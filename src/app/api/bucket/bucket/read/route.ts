import { NextResponse } from "next/server"
import { checkPublicReadAccess } from "@/app/bucket/src/util"
import { getBucketName } from "../../s3/util"

export async function GET(): Promise<void | NextResponse> {
  const { error, response } = await checkPublicReadAccess()
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }
  const bucketName = await getBucketName()
  return NextResponse.json({ bucketName })
}
