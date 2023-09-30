import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ isAIConfigured: Boolean(process.env.OPENAI_API_KEY) })
}
