import OpenAI from "openai"
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/index.mjs"

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function getStream(body: ChatCompletionCreateParamsStreaming) {
  if (!openai) {
    return null
  }
  const chatStream = await openai.chat.completions.create(body)

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for await (const part of chatStream) {
        if (part?.choices) {
          const chunk = part.choices[0]?.delta?.content || part.choices[0]?.delta?.function_call?.arguments || ""
          if (chunk) {
            controller.enqueue(encoder.encode(chunk))
          }
        }
      }
      // Close the controller once all data has been read
      controller.close()
    },
  })

  return stream
}
