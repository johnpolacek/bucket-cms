import { permanentRedirect } from "next/navigation"

export default async function Home() {
  return permanentRedirect("/bucket/admin")
}
