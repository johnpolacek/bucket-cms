import { PutObjectCommand } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"
import slugify from "slugify"
import { doesItemExist } from "."

export async function createCollectionItem(collectionName: string, itemName: string, data: any) {
  try {
    // Validate the itemName
    if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
      throw new Error("Item name is required and should be a non-empty string.")
    }

    const s3 = initializeS3Client()
    const bucketName = await getBucketName()

    // Generate the initial slug from the item name
    let slug = slugify(itemName, { lower: true, strict: true })
    let originalSlug = slug
    let counter = 1
    while (await doesItemExist(collectionName, slug)) {
      slug = `${originalSlug}-${counter}`
      counter++
    }

    // Convert the data to a JSON string
    const fileContent = JSON.stringify({ itemName, data })

    // Define the path where the item will be stored
    const itemKey = `items/${collectionName}/${slug}.json`

    // Create a command to upload the item data to S3
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: itemKey,
      Body: fileContent,
      ContentType: "application/json",
    })

    // Send the command to upload the item data to S3
    await s3.send(putCommand)

    return { success: true, itemId: slug }
  } catch (error: any) {
    throw new Error(`${error.message || "An error occurred"}`)
  }
}
