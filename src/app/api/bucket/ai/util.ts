import OpenAI from "openai"
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/index.mjs"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getStream(body: ChatCompletionCreateParamsStreaming) {
  const chatStream = await openai.chat.completions.create(body)

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      console.log("getStream controller start")

      for await (const part of chatStream) {
        if (part?.choices) {
          console.log("getStream part.choices[0]", part.choices[0])
          const chunk = part.choices[0]?.delta?.content || part.choices[0]?.delta?.function_call?.arguments || ""
          if (chunk) {
            console.log({ chunk })
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
