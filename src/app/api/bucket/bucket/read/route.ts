import { NextResponse } from "next/server"
import { getBucketName } from "../../s3/util"

export async function GET() {
  const bucketName = await getBucketName()
  return NextResponse.json({ bucketName })
}
