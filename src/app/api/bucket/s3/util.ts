import { S3Client } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { getSessionUser } from "../auth/get-session-user"

export const initializeS3Client = (): S3Client => {
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  })
}

export const getBucketName = async (isPublic?: boolean): Promise<string> => {
  let sandbox = ""
  const sessionUser = await getSessionUser()

  if (process.env.USE_SANDBOX === "true" && sessionUser?.email) {
    sandbox = sessionUser.email
      .toLowerCase()
      .replace("@", "-")
      .replace(/[^a-z0-9.\-_]/g, "")
      .replace(/\./g, "-")
      .replace("-gmail-com", "")
    sandbox = "-" + sandbox
  }

  let suffix = isPublic ? "-public" : ""
  return process.env.AWS_S3_BUCKET_NAME ? process.env.AWS_S3_BUCKET_NAME + sandbox + suffix : ""
}

// Helper function to convert a Readable stream to a string
export const streamToString = (stream: Readable): Promise<string> => {
  const chunks: any[] = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    stream.on("error", reject)
  })
}
