import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ isConfigured: Boolean(process.env.OPEN_AI_SECRET) })
}
