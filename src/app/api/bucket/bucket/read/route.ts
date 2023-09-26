import { NextResponse } from "next/server"
import { checkPublicReadAccess } from "@/app/bucket/src/util"
import { getBucketName } from "../../s3/util"

export async function GET() {
  const { error, response } = await checkPublicReadAccess()
  if (error) {
    return response
  }
  const bucketName = await getBucketName()
  return NextResponse.json({ bucketName })
}
