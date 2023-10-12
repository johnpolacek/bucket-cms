import { NextRequest, NextResponse } from "next/server"
import { getStream } from "../util"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const stream = await getStream({
    model: "gpt-4",
    messages,
    functions: [
      {
        name: "get_react_component",
        description: "Generates the name and code for a react component",
        parameters: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "base64 encoded TSX code for a react component in TypeScript styled with Tailwind and without comments",
            },
            name: {
              type: "string",
              description: "Name of the component including .tsx extension",
            },
          },
          required: ["code", "name"],
        },
      },
    ],
    function_call: { name: "get_react_component" },
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
