import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const isTestEnvironment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
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
    ...(isTestEnvironment
      ? [
          CredentialsProvider({
            id: "test",
            name: "Test",
            credentials: {},
            async authorize(credentials, req) {
              return { id: "test-user", name: "Test User", email: "test@user.dev" }
            },
          }),
        ]
      : []),
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
