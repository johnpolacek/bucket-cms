import { GetObjectCommand } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"

export const doesItemExist = async (collectionName: string, slug: string) => {
  const s3 = initializeS3Client()
  const itemKey = `items/${collectionName}/${slug}.json`
  try {
    const bucketName = await getBucketName()
    await s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: itemKey,
      })
    )
    return true
  } catch (error) {
    return false
  }
}
