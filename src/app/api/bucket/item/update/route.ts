import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client, doesItemExist, getBucketName } from "../../s3/util"
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import slugify from "slugify"

export async function PUT(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "PUT") {
    try {
      const json = await req.json()

      const { collectionName, itemName, data, itemId } = json
      console.log({ collectionName, itemName, data, itemId })

      // Validate the itemName
      if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
        return NextResponse.json({ error: "Item name is required and should be a non-empty string." }, { status: 400 })
      }

      // Validate itemId
      if (!itemId || typeof itemId !== "string" || !itemId.trim()) {
        return NextResponse.json({ error: "Item ID is required for updating." }, { status: 400 })
      }

      // Fetch the current item data
      const bucketName = await getBucketName()
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
        // Generate a new unique slug
        let slug = slugify(itemName, { lower: true, strict: true })
        let originalSlug = slug
        let counter = 1
        while (await doesItemExist(collectionName, slug)) {
          // Reuse the doesItemExist function from POST endpoint
          slug = `${originalSlug}-${counter}`
          counter++
        }

        // Update the itemId with the new slug
        newPath = `items/${collectionName}/${slug}.json`
      }

      // Convert the data to a JSON string
      const fileContent = JSON.stringify({ itemName, data })

      // Upload the updated JSON string to S3
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: newPath,
        Body: fileContent,
        ContentType: "application/json",
      })

      await s3.send(command)

      // If itemName has changed (meaning we have a new slug), then delete the old file
      if (newPath !== currentKey) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: currentKey,
        })
        await s3.send(deleteCommand)
      }

      return NextResponse.json({ success: true, itemId: (newPath.split("/").pop() || "").replace(".json", "") }, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: `${error.message || "An error occurred"}`, stack: error.stack }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 })
  }
}
