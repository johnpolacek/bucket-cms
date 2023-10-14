interface SessionUser {
  name: string
  email?: string
}

export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  if (process.env.NODE_ENV === "development") {
    // Return a placeholder user when in development mode
    return {
      name: "Localhost",
      email: undefined,
    }
  } else {
    return undefined
  }
}
