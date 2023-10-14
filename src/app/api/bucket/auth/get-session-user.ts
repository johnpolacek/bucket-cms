import { getServerSession } from "next-auth/next"
import { options } from "../../../../app/bucket/options"

interface SessionUser {
  name: string
  email?: string
}

export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  let session = await getServerSession(options)
  return session?.user?.name ? { name: session.user.name, email: session.user.email || undefined } : undefined
}
