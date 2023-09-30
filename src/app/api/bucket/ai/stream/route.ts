import { NextRequest, NextResponse } from "next/server"
import { getStream } from "../util"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  console.log("api/bucket/ai/stream request", { messages })
  const systemMessage = {
    role: "system",
    content:
      "You are a TSX component component generator for a React-based CMS. You will reply with text for a single component file that can be pasted directly into a TSX file. Use tailwind only for CSS. Do not provide any explanation or markdown formating, only plain text code of the file itself.",
  }

  const stream = await getStream({
    model: "gpt-4",
    messages: [systemMessage, ...messages],
    stream: true,
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
