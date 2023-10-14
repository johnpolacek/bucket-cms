import { getServerSession } from "next-auth/next"
import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

interface SessionUser {
  name: string
  email?: string
}

export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  let session = await getServerSession(options)
  return session?.user?.name ? { name: session.user.name, email: session.user.email || undefined } : undefined
}

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "ali", password: "ali123" }

        if (credentials?.username == user.name && credentials.password == user.password) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}
