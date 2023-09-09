"use client"
import React, { ReactElement } from "react"
import { FieldType, FieldTypeProps } from "../types"
import { z } from "zod"
import { Input } from "../ui"

const schema = z.object({
  value: z
    .string()
    .min(1, "URL cannot be empty")
    .refine(
      (value) => {
        // We could improve these regex to match YouTube and Vimeo URL patterns more precisely
        const youtubePattern = /^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)/
        const vimeoPattern = /^(https:\/\/vimeo\.com\/)/
        return youtubePattern.test(value) || vimeoPattern.test(value)
      },
      {
        message: "Invalid YouTube or Vimeo URL",
        path: ["value"], // Specify the path to the field
      }
    ),
})

export type VideoEmbedData = z.infer<typeof schema>

export const VideoEmbed: FieldType<VideoEmbedData> = {
  renderAdmin: ({ data, setData }: FieldTypeProps<VideoEmbedData>): ReactElement => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData && setData({ value: e.target.value })
    }

    let videoEmbedURL: string | null = null
    if (data?.value) {
      const youtubePattern = /^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)/
      const vimeoPattern = /^(https:\/\/vimeo\.com\/)/
      if (youtubePattern.test(data.value)) {
        const youtubeVideoId = data.value.split("v=")[1]?.split("&")[0] || data.value.split("youtu.be/")[1]
        videoEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`
      } else if (vimeoPattern.test(data.value)) {
        const vimeoVideoId = data.value.split("vimeo.com/")[1]
        videoEmbedURL = `https://player.vimeo.com/video/${vimeoVideoId}`
      }
    }

    return (
      <div>
        {videoEmbedURL && (
          <div className="mb-1 -mt-1 rounded-lg scale-95 overflow-hidden">
            <iframe
              width="100%"
              height="315"
              src={videoEmbedURL}
              title="Video Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Input type="text" defaultValue={data?.value || ""} onChange={handleChange} />
      </div>
    )
  },
  validate: (data: VideoEmbedData) => {
    const validationResult = schema.safeParse(data)
    if (validationResult.success) {
      return { isValid: true }
    } else {
      return { isValid: false, errorMessage: validationResult.error.issues[0]?.message || "Invalid data" }
    }
  },
  schema,
}
