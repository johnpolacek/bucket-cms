import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"
import { CollectionData } from "@/app/bucket/src/types"

async function getCollectionNames(bucketName: string, s3: any): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: "collections/",
  })
  const response = await s3.send(command)

  return response.Contents?.map((item: { Key?: string }) => item.Key?.replace("collections/", "").replace(".json", "")).filter((name: string | undefined): name is string => name !== undefined) || []
}

async function fetchCollectionCounts(bucketName: string, collectionNames: string[], s3: any): Promise<CollectionData[]> {
  return await Promise.all(
    collectionNames.map(async (collectionName) => {
      const itemCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `items/${collectionName}/`,
      })
      const itemResponse = await s3.send(itemCommand)
      const itemCount = itemResponse.KeyCount || 0
      return { collectionName, itemCount }
    })
  )
}

async function getCollectionsWithCountsForBucket(isPublic: boolean, s3: any): Promise<CollectionData[]> {
  const bucketName = await getBucketName(isPublic)
  const collectionNames = await getCollectionNames(bucketName, s3)
  return await fetchCollectionCounts(bucketName, collectionNames, s3)
}

export async function readCollectionCounts(): Promise<CollectionData[]> {
  const s3 = initializeS3Client()

  const collectionsWithCountsPublic = await getCollectionsWithCountsForBucket(true, s3)
  const collectionsWithCountsPrivate = await getCollectionsWithCountsForBucket(false, s3)

  return [...collectionsWithCountsPublic, ...collectionsWithCountsPrivate]
}
