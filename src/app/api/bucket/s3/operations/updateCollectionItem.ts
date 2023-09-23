import { GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"
import slugify from "slugify"
import { doesItemExist } from "."

export async function updateCollectionItem(collectionName: string, itemName: string, data: any, itemId: string) {
  try {
    // Validate the itemName and itemId
    if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
      throw new Error("Item name is required and should be a non-empty string.")
    }
    if (!itemId || typeof itemId !== "string" || !itemId.trim()) {
      throw new Error("Item ID is required for updating.")
    }

    const s3 = initializeS3Client()
    const bucketName = await getBucketName()

    // Fetch the current item data
    const currentKey = `items/${collectionName}/${itemId}.json`
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: currentKey,
    })
    const currentDataResponse = await s3.send(getObjectCommand)

    let dataResponse = ""
    if (currentDataResponse.Body) {
      for await (const chunk of currentDataResponse.Body as AsyncIterable<Uint8Array>) {
        dataResponse += chunk
      }
    } else {
      throw new Error("Failed to fetch current item data from S3.")
    }

    const currentData = JSON.parse(dataResponse)
    let newPath = currentKey

    // Check if the itemName has changed
    if (currentData.itemName !== itemName) {
      let slug = slugify(itemName, { lower: true, strict: true })
      let originalSlug = slug
      let counter = 1
      while (await doesItemExist(collectionName, slug)) {
        slug = `${originalSlug}-${counter}`
        counter++
      }
      newPath = `items/${collectionName}/${slug}.json`
    }

    // Convert the data to a JSON string
    const fileContent = JSON.stringify({ itemName, data })

    // Upload the updated JSON string to S3
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: newPath,
      Body: fileContent,
      ContentType: "application/json",
    })

    await s3.send(putCommand)

    // If itemName has changed (meaning we have a new slug), then delete the old file
    if (newPath !== currentKey) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: currentKey,
      })
      await s3.send(deleteCommand)
    }

    return { success: true, itemId: (newPath.split("/").pop() || "").replace(".json", "") }
  } catch (error: any) {
    throw new Error(`${error.message || "An error occurred"}`)
  }
}
