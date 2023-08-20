import { NextResponse } from "next/server"

export async function GET() {
  const hasAWSAccess = Boolean(process.env.AWS_ACCESS_KEY_ID)
  const hasAWSSecret = Boolean(process.env.AWS_SECRET_ACCESS_KEY)
  const hasAWSRegion = Boolean(process.env.AWS_REGION)
  const hasAWSBucket = Boolean(process.env.AWS_S3_BUCKET_NAME)

  return NextResponse.json({ hasAWSAccess, hasAWSSecret, hasAWSRegion, hasAWSBucket })
}
