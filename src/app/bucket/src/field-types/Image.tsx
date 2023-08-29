import { z } from "zod"
import { BaseComponent } from "../../types"
import NextImage from "next/image"
import React from "react"

const ImageComponentData = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
})

export type ImageComponentDataType = z.infer<typeof ImageComponentData>

const ImageComponent: BaseComponent<ImageComponentDataType> = {
  type: "Image",
  render: (data) => {
    return <NextImage src={data.url} alt={data.alt} width={data.width} height={data.height} />
  },
  renderAdmin: (data, setData) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)

        // Get image dimensions
        const img = new Image()
        img.onload = async function () {
          const width = img.width
          const height = img.height

          try {
            const response = await fetch("/api/bucket/upload/image", {
              method: "POST",
              body: formData,
            })
            if (response.ok) {
              const { url } = await response.json()
              setData({ ...data, url, width, height })
            } else {
              console.error("Error uploading image")
            }
          } catch (err) {
            console.error("There was an error uploading the image:", err)
          }
        }
        img.onerror = function () {
          console.error("Failed to retrieve image dimensions")
        }
        img.src = URL.createObjectURL(file)
      }
    }

    return (
      <div>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {data.url && <img src={data.url} alt={data.alt} style={{ width: 100, height: 100 }} />}
        <label>
          Alt Text:
          <input type="text" value={data.alt} onChange={(e) => setData({ ...data, alt: e.target.value })} />
        </label>
      </div>
    )
  },
  validate: (data) => {
    const validationResult = ImageComponentData.safeParse(data)
    return validationResult.success
  },
  defaultData: {
    url: "",
    alt: "",
    width: 0,
    height: 0,
  },
}

export default ImageComponent
